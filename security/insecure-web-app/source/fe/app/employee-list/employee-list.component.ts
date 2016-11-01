import {Component} from "@angular/core";
import {EmployeeService} from "./employee.service";
import {Employee} from "./employee.model";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css'],
  moduleId: module.id,
})
export class EmployeeListComponent {

  employees: Employee[];

  constructor(private employeeService: EmployeeService, private authService: AuthService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().then(employees => {
      this.employees = employees;
    });
  }

  get canDelete(): boolean {
    return this.authService.isAdmin;
  }
}