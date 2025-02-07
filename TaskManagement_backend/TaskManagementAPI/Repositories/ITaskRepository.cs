using TaskManagementAPI.DTOs;
using TaskManagementAPI.Models;
using Task = System.Threading.Tasks.Task;

namespace TaskManagementAPI.Repositories;

public interface ITaskRepository
{
    Task<List<Models.Task>> GetAllTasksAsync();
    Task<Models.Task> GetTaskByIdAsync(int id);
    Task<Models.Task> AddTaskAsync(TaskDto taskDto);
    Task UpdateTaskAsync(int id, TaskDto taskDto);
    Task DeleteTaskAsync(int id);
    Task<List<Category>> GetAllCategoriesAsync();
    Task<Category> AddCategoryAsync(CategoryDto categoryDto);
    Task<Category> GetCategoryByIdAsync(int id);
}