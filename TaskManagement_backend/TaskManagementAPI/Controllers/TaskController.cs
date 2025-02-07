using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.DTOs;
using TaskManagementAPI.Repositories;

namespace TaskManagementAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TaskController : ControllerBase
{
    private readonly ITaskRepository _taskRepository;

    public TaskController(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var tasks = await _taskRepository.GetAllTasksAsync();
        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var task = await _taskRepository.GetTaskByIdAsync(id);
        if (task == null) return NotFound();
        return Ok(task);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TaskDto taskDto)
    {
        var task = await _taskRepository.AddTaskAsync(taskDto);
        return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] TaskDto taskDto)
    {
        await _taskRepository.UpdateTaskAsync(id, taskDto);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _taskRepository.DeleteTaskAsync(id);
        return NoContent();
    }
    
    [HttpGet("category")]
    public async Task<IActionResult> GetAllCategories()
    {
        var categories = await _taskRepository.GetAllCategoriesAsync();
        return Ok(categories);
    }
    
    [HttpPost("category")]
    public async Task<IActionResult> AddCategory([FromBody] CategoryDto categoryDto)
    {
        var category = await _taskRepository.AddCategoryAsync(categoryDto);
        return CreatedAtAction(nameof(GetCategoryById), new { id = category.Id }, category);
    }

    [HttpGet("category/{id}")]
    public async Task<IActionResult> GetCategoryById(int id)
    {
        var category = await _taskRepository.GetCategoryByIdAsync(id);
        if (category == null)
        {
            return NotFound();
        }
        return Ok(category);
    }

}