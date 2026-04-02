using AdminDashboard.Api.Models;

namespace AdminDashboard.Api.Data;

public class AppDataContext
{
    public List<User> Users { get; }
    public List<Product> Products { get; }
    public List<Order> Orders { get; }

    public AppDataContext()
    {
        Users = SeedUsers();
        Products = SeedProducts();
        Orders = SeedOrders(Products);
    }

    // The app uses seeded in-memory data to keep setup simple for demo and portfolio use.
    private static List<User> SeedUsers()
    {
        var now = DateTime.UtcNow;

        return
        [
            new User { Id = Guid.NewGuid(), FullName = "Maya Carter", Email = "maya.carter@northstar.dev", Role = "Admin", Status = "Active", CreatedAt = now.AddMonths(-11) },
            new User { Id = Guid.NewGuid(), FullName = "Omar Benali", Email = "omar.benali@northstar.dev", Role = "Manager", Status = "Active", CreatedAt = now.AddMonths(-9) },
            new User { Id = Guid.NewGuid(), FullName = "Sofia Nguyen", Email = "sofia.nguyen@northstar.dev", Role = "Support", Status = "Active", CreatedAt = now.AddMonths(-7) },
            new User { Id = Guid.NewGuid(), FullName = "Lucas Martin", Email = "lucas.martin@northstar.dev", Role = "Editor", Status = "Inactive", CreatedAt = now.AddMonths(-6) },
            new User { Id = Guid.NewGuid(), FullName = "Nina Patel", Email = "nina.patel@northstar.dev", Role = "Admin", Status = "Active", CreatedAt = now.AddMonths(-5) },
            new User { Id = Guid.NewGuid(), FullName = "Amine El Idrissi", Email = "amine.idrissi@northstar.dev", Role = "Manager", Status = "Pending", CreatedAt = now.AddMonths(-4) },
            new User { Id = Guid.NewGuid(), FullName = "Hana Kim", Email = "hana.kim@northstar.dev", Role = "Support", Status = "Active", CreatedAt = now.AddMonths(-2) },
            new User { Id = Guid.NewGuid(), FullName = "Youssef Kadiri", Email = "youssef.kadiri@northstar.dev", Role = "Editor", Status = "Active", CreatedAt = now.AddDays(-24) }
        ];
    }

    private static List<Product> SeedProducts()
    {
        var now = DateTime.UtcNow;

        return
        [
            new Product { Id = Guid.NewGuid(), Name = "Pro Headphones", Category = "Audio", Price = 129.99m, Stock = 41, Status = "Active", CreatedAt = now.AddMonths(-8) },
            new Product { Id = Guid.NewGuid(), Name = "Smart Speaker Mini", Category = "Audio", Price = 79.00m, Stock = 19, Status = "Active", CreatedAt = now.AddMonths(-7) },
            new Product { Id = Guid.NewGuid(), Name = "4K Monitor 27\"", Category = "Displays", Price = 329.50m, Stock = 12, Status = "Active", CreatedAt = now.AddMonths(-6) },
            new Product { Id = Guid.NewGuid(), Name = "Mechanical Keyboard", Category = "Accessories", Price = 94.00m, Stock = 58, Status = "Active", CreatedAt = now.AddMonths(-5) },
            new Product { Id = Guid.NewGuid(), Name = "Wireless Mouse", Category = "Accessories", Price = 49.90m, Stock = 76, Status = "Active", CreatedAt = now.AddMonths(-4) },
            new Product { Id = Guid.NewGuid(), Name = "USB-C Hub", Category = "Accessories", Price = 39.99m, Stock = 8, Status = "Low Stock", CreatedAt = now.AddMonths(-3) },
            new Product { Id = Guid.NewGuid(), Name = "Office Lamp", Category = "Workspace", Price = 59.00m, Stock = 22, Status = "Active", CreatedAt = now.AddMonths(-2) },
            new Product { Id = Guid.NewGuid(), Name = "Standing Desk", Category = "Workspace", Price = 499.00m, Stock = 5, Status = "Low Stock", CreatedAt = now.AddDays(-18) }
        ];
    }

    private static List<Order> SeedOrders(List<Product> products)
    {
        var now = DateTime.UtcNow;

        return
        [
            CreateOrder("Noah Sinclair", "noah.sinclair@example.com", "Delivered", now.AddMonths(-5).AddDays(2), (products[0], 1), (products[4], 2)),
            CreateOrder("Leila Haddad", "leila.haddad@example.com", "Delivered", now.AddMonths(-5).AddDays(11), (products[2], 1)),
            CreateOrder("Ethan Brooks", "ethan.brooks@example.com", "Shipped", now.AddMonths(-4).AddDays(5), (products[3], 1), (products[5], 1)),
            CreateOrder("Jade Moreno", "jade.moreno@example.com", "Delivered", now.AddMonths(-4).AddDays(18), (products[7], 1)),
            CreateOrder("Meryem Alami", "meryem.alami@example.com", "Delivered", now.AddMonths(-3).AddDays(3), (products[1], 2), (products[6], 1)),
            CreateOrder("Oliver Reed", "oliver.reed@example.com", "Pending", now.AddMonths(-3).AddDays(14), (products[5], 2)),
            CreateOrder("Sara El Fassi", "sara.elfassi@example.com", "Delivered", now.AddMonths(-2).AddDays(4), (products[0], 1), (products[3], 1)),
            CreateOrder("Lina Bennett", "lina.bennett@example.com", "Shipped", now.AddMonths(-2).AddDays(22), (products[2], 2)),
            CreateOrder("Karim Mansouri", "karim.mansouri@example.com", "Pending", now.AddMonths(-1).AddDays(6), (products[4], 3), (products[6], 1)),
            CreateOrder("Ava Turner", "ava.turner@example.com", "Delivered", now.AddMonths(-1).AddDays(13), (products[7], 1), (products[5], 1)),
            CreateOrder("Yara Saidi", "yara.saidi@example.com", "Processing", now.AddDays(-12), (products[1], 1), (products[3], 1), (products[4], 1)),
            CreateOrder("Daniel Foster", "daniel.foster@example.com", "Pending", now.AddDays(-3), (products[0], 2))
        ];
    }

    private static Order CreateOrder(string customerName, string customerEmail, string status, DateTime createdAt, params (Product Product, int Quantity)[] entries)
    {
        var items = entries.Select(entry => new OrderItem
        {
            ProductId = entry.Product.Id,
            ProductName = entry.Product.Name,
            Quantity = entry.Quantity,
            UnitPrice = entry.Product.Price
        }).ToList();

        return new Order
        {
            Id = Guid.NewGuid(),
            CustomerName = customerName,
            CustomerEmail = customerEmail,
            Status = status,
            CreatedAt = createdAt,
            Items = items,
            Total = items.Sum(item => item.Quantity * item.UnitPrice)
        };
    }
}
