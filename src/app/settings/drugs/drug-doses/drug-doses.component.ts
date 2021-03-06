import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drug-doses',
  templateUrl: './drug-doses.component.html',
  styleUrls: ['./drug-doses.component.css']
})
export class DrugDosesComponent implements OnInit {

  constructor() { }

  tableOptions: Object = {
    colReorder: true,
    ajax: 'assets/api/tables/drugs.dummy.json',
    columns: [{ data: 'dose' }, { data: 'value' }, { data: 'frequency' }],
    "columnDefs": [
      {
        "render": function (data, type, row) {
          return `
               <div>
               <button class="btn btn-primary" data-toggle="modal" data-target="#edit"> Edit	</button>  
               <button class="btn btn-danger" data-toggle="modal" data-target="#disable"> Disable	</button>
               <div id="edit" class="modal fade" role="dialog">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 class="modal-title">Edit</h4>
                    </div>
                    <div class="modal-body">
                      <form>
                      <table style="width: 100%" class="table">
                        <tbody>
                          <tr>
                            <th>Dose Name</th>
                            <td><input type="text" class="form-control"></td>
                          </tr>
                          <tr>
                            <th>Dose Value</th>
                            <td><input type="text" class="form-control"></td>
                          </tr>
                          <tr>
                            <th>Dose Frequency</th>
                            <td><input type="text" class="form-control"></td>
                          </tr>
                          <tr>
                            <td></td>
                            <td style="text-align: right"><button class="btn btn-primary" type="submit"><i class="fa fa-save"></i> Update	</button>
                              <button class="btn btn-danger" data-dismiss="modal"> Cancel	</button></td>
                          </tr>
                        </tbody>
                      </table>                                           
                    </form>
                    </div>
                  </div>
                </div>
              </div>
              <div id="disable" class="modal fade" role="dialog">
                <div class="modal-dialog modal-sm">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 class="modal-title">Disable</h4>
                    </div>
                    <div class="modal-body">
                      <form>
                        <h3>Are you sure?</h3>
                        <div style="text-align: right">
                        <button class="btn btn-primary"> Disable	</button>
                        <button class="btn btn-danger" data-dismiss="modal"> Cancel	</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>                            
              </div>
              `
        },
        "targets": 3
      },
      { "targets": 0 }
    ],
    responsive: true
  }

  ngOnInit() {
  }

}
