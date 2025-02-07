namespace TaskManagementAPI.DTOs;

public class TaskDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public bool IsCompleted { get; set; }
    public int CategoryId { get; set; }
}