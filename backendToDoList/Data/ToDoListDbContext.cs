using backendToDoList.Entities;
using Microsoft.EntityFrameworkCore;


namespace backendToDoList.Data
{
    public class ToDoListDbContext : DbContext
    {

        public ToDoListDbContext(DbContextOptions<ToDoListDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Entities.Task> Tasks { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
 
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("Users");

                entity.HasKey(u => u.Id);

                entity.Property(u => u.Email)
                      .IsRequired()
                      .HasMaxLength(100)
                      .HasColumnType("varchar(100)");

                entity.Property(u => u.Password)
                      .IsRequired()
                      .HasMaxLength(100)
                      .HasColumnType("varchar(100)");

                entity.HasMany(u => u.Tasks)
                      .WithOne(t => t.User)
                      .HasForeignKey(t => t.UserId)
                      .OnDelete(DeleteBehavior.Cascade); ;
            });

            modelBuilder.Entity<Entities.Task>(entity =>
            {

                entity.ToTable("Tasks");

                entity.HasKey(t => t.Id);

                entity.Property(t => t.UserId)
                      .IsRequired()
                      .HasColumnType("int");

                entity.Property(t => t.Title)
                      .IsRequired()
                      .HasMaxLength(100)
                      .HasColumnType("varchar(100)");


                entity.Property(t => t.Description)
                      .HasMaxLength(300)
                      .HasColumnType("varchar(300)");

                entity.Property(t => t.IsDone)
                      .IsRequired()
                      .HasColumnType("bit");

                entity.Property(t => t.Deadline)
                      .HasColumnType("datetime2");

                entity.HasOne(t => t.User)
                      .WithMany(u => u.Tasks)
                      .HasForeignKey(t => t.UserId)
                      .OnDelete(DeleteBehavior.Cascade);

            });

            base.OnModelCreating(modelBuilder);
        }


    }
}
