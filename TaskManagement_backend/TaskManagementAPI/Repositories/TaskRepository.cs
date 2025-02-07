using Microsoft.EntityFrameworkCore;
using TaskManagementAPI.Data;
using TaskManagementAPI.DTOs;
using TaskManagementAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace TaskManagementAPI.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly ApplicationDbContext _context;

    public TaskRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Models.Task>> GetAllTasksAsync()
    {
        return await _context.Tasks.ToListAsync();
    }

    public async Task<Models.Task> GetTaskByIdAsync(int id)
    {
        return await _context.Tasks.FindAsync(id) ?? throw new InvalidOperationException();
    }

    public async Task<Models.Task> AddTaskAsync(TaskDto taskDto)
    {
        var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == taskDto.CategoryId);

        var task = new Models.Task
        {
            Title = taskDto.Title,
            Description = taskDto.Description,
            IsCompleted = taskDto.IsCompleted,
            CategoryId = taskDto.CategoryId,
            Category = category
        };
        
        await _context.Tasks.AddAsync(task);
        await _context.SaveChangesAsync();

        return task;
    }


    public async Task UpdateTaskAsync(int id, TaskDto taskDto)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null)
        {
            throw new InvalidOperationException("Task doesn't exist");
        }

        task.Title = taskDto.Title;
        task.Description = taskDto.Description;
        task.IsCompleted = taskDto.IsCompleted;
        task.CategoryId = taskDto.CategoryId;
        
        _context.Tasks.Update(task);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteTaskAsync(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task != null)
        {
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
        }
        else
            throw new InvalidOperationException("Task doesn't exist");
    }
    
    public async Task<List<Category>> GetAllCategoriesAsync()
    {
        return await _context.Categories.ToListAsync();
    }
    
    public async Task<Category> AddCategoryAsync(CategoryDto categoryDto)
    {
        var category = new Category
        {
            Name = categoryDto.Name
        };

        await _context.Categories.AddAsync(category);
        await _context.SaveChangesAsync();
    
        return category;
    }

    public async Task<Category> GetCategoryByIdAsync(int id)
    {
        var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
        return category;
    }

}