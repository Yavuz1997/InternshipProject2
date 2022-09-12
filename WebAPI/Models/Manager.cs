using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Manager
    {
        public int ID { get; set; }
        public string ManagerName { get; set; }
        public int EmployeeCount { get; set; }
    }
}