using Microsoft.EntityFrameworkCore;
using TaskManagementAPI.Data;
using TaskManagementAPI.DTOs;
using TaskManagementAPI.Models;
using TaskManagementAPI.Repositories;
using Task = System.Threading.Tasks.Task;

namespace TaskManagementAPI.Tests.Repositories;

public class TaskRepositoryTests
{
    private readonly TaskRepository _repository;
    private readonly DbContextOptions<ApplicationDbContext> _options;
    private readonly ApplicationDbContext _context;

    public TaskRepositoryTests()
    {
        _options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb")
            .Options;
        
        _context = new ApplicationDbContext(_options);
        _repository = new TaskRepository(_context);
    }
    
    [Fact]
    public async Task GetAllTasksAsync_Should_Return_All_Tasks()
    {
        // Arrange
        _context.Tasks.Add(new Models.Task { Title = "Task 1", Description = "Task 1 description", IsCompleted = false, CategoryId = 1 });
        _context.Tasks.Add(new Models.Task { Title = "Task 2", Description = "Task 2 description", IsCompleted = true, CategoryId = 2 });
        await _context.SaveChangesAsync();

        // Act
        var tasks = await _repository.GetAllTasksAsync();

        // Assert
        Assert.Equal(2, tasks.Count);
    }

    [Fact]
    public async Task GetTaskByIdAsync_Should_Return_Task_If_Exists()
    {
        // Arrange
        var task = new Models.Task { Title = "Sample Task", Description = "Sample task description", IsCompleted = false, CategoryId = 1 };
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        // Act
        var result = await _repository.GetTaskByIdAsync(task.Id);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(task.Title, result.Title);
    }

    [Fact]
    public async Task AddTaskAsync_Should_Add_Task()
    {
        // Arrange
        var taskDto = new TaskDto { Title = "New Task", Description = "New task description", IsCompleted = true, CategoryId = 1 };

        // Act
        var result = await _repository.AddTaskAsync(taskDto);
        var taskExists = await _context.Tasks.AnyAsync(t => t.Id == result.Id);

        // Assert
        Assert.NotNull(result);
        Assert.True(taskExists);
    }

    [Fact]
    public async Task UpdateTaskAsync_Should_Update_Task_If_Exists()
    {
        // Arrange
        var task = new Models.Task { Title = "Old Task", Description = "Old task description", IsCompleted = false, CategoryId = 1 };
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        var updatedDto = new TaskDto { Title = "Updated Task", CategoryId = 2 };

        // Act
        await _repository.UpdateTaskAsync(task.Id, updatedDto);
        var updatedTask = await _context.Tasks.FindAsync(task.Id);

        // Assert
        Assert.NotNull(updatedTask);
        Assert.Equal("Updated Task", updatedTask.Title);
    }

    [Fact]
    public async Task UpdateTaskAsync_Should_Throw_Exception_If_Not_Found()
    {
        // Arrange
        var updatedDto = new TaskDto { Title = "Updated Task", Description = "Updated task description", IsCompleted = false, CategoryId = 2 };

        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(() => _repository.UpdateTaskAsync(999, updatedDto));
    }

    [Fact]
    public async Task DeleteTaskAsync_Should_Remove_Task()
    {
        // Arrange
        var task = new Models.Task { Title = "Task to Delete", Description = "Task to Delete description", IsCompleted = false, CategoryId = 1 };
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        // Act
        await _repository.DeleteTaskAsync(task.Id);
        var deletedTask = await _context.Tasks.FindAsync(task.Id);

        // Assert
        Assert.Null(deletedTask);
    }

    [Fact]
    public async Task DeleteTaskAsync_Should_Throw_Exception_If_Not_Found()
    {
        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(() => _repository.DeleteTaskAsync(9999));
    }

    [Fact]
    public async Task AddCategoryAsync_Should_Add_New_Category()
    {
        // Arrange
        var categoryDto = new CategoryDto { Name = "Work" };

        // Act
        var result = await _repository.AddCategoryAsync(categoryDto);
        var categoryExists = await _context.Categories.AnyAsync(c => c.Name == "Work");

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Work", result.Name);
        Assert.True(categoryExists);
    }

    [Fact]
    public async Task GetCategoryByIdAsync_Should_Return_Category()
    {
        // Arrange
        var category = new Category { Name = "Personal" };
        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        // Act
        var result = await _repository.GetCategoryByIdAsync(category.Id);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(category.Id, result.Id);
    }
}