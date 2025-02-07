using System.ComponentModel.DataAnnotations;

namespace TaskManagementAPI.Models;

public class Task
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Title { get; set; }
    public string Description { get; set; }
    public bool IsCompleted { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; }
}