namespace AdminDashboard.Api.DTOs;

public class TrendPointDto
{
    public string Label { get; set; } = string.Empty;
    public decimal Revenue { get; set; }
    public int Orders { get; set; }
}
