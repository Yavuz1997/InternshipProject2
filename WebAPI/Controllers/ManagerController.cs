using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class ManagerController : ApiController
    {

        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();

            string query = @"select ID,ManagerName,EmployeeCount from dbo.Managers";

            var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString);
            var command = new SqlCommand(query, con);

            using (var da = new SqlDataAdapter(command))
            {
                command.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);

        }

        public string Post(Manager man)
        {
            try
            {
                DataTable table = new DataTable();

                
                string query = @"insert into dbo.Managers (ManagerName) values ('" + man.ManagerName + @"')";

                var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString);
                var command = new SqlCommand(query, con);

                using (var da = new SqlDataAdapter(command))
                {
                    command.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Added succesfully";
            }
            catch (Exception ex)
            {

                return "Failed to add";
            }

        }
        public string Put(Manager man)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"update dbo.Departments set DepartmentName='" + man.ManagerName +
                    @"' where  DepartmentID=" + man.ID + @"
                    ";

                var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString);
                var command = new SqlCommand(query, con);

                using (var da = new SqlDataAdapter(command))
                {
                    command.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Updated succesfully";
            }
            catch (Exception ex)
            {

                return "Failed to update";
            }

        }
        public string Delete(int id)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"delete from dbo.Managers where ID = " + id;

                var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString);
                var command = new SqlCommand(query, con);

                using (var da = new SqlDataAdapter(command))
                {
                    command.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Deleted succesfully";
            }
            catch (Exception ex)
            {

                return "Failed to delete";
            }

        }
    }
}