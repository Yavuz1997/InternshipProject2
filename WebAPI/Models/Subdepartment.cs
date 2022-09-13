using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Subdepartment
    {
        public int ID { get; set; }
        public int DepartmentID { get; set; }
        public string SubName { get; set; }
    }
}