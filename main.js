$(document).ready(function () {
	table = $('#example_table').DataTable({
		rowCallback: function (row, data, index) {
			var allData = this.api()
				.column(0, { search: 'applied' })
				.data()
				.toArray();
			if (allData.indexOf(data[0]) !== allData.lastIndexOf(data[0])) {
				$('td:eq(0)', row).css('background-color', '#3eaf14');
			}
		},
		orderCellsTop: true,
		pageLength: 20,
		order: [[1, 'asc']],
		processing: true,
		orderClasses: false,
		deferRender: true,
		responsive: true,
		dom: 'Blfrtip',
		fixedHeader: {
			header: true,
		},

		//"columns":columnsArray,
		//buttons: buttonsArray,
		initComplete: function () {
			var api = this.api();
			count = 0;

			this.api().columns(2).every(function () {
					var column = this;
					var title = column.header(); 
					title = $(title).html().replace(/[W]/g, '-');

					var select = $('<select id="select-'+title+'" class="select2"></option></select>')
						.appendTo('#selectTriggerFilter')
						.on('change', function () {
							var data = $.map($(this).select2('data'),
								function (value, key) {
									return value.text ? '^' + $.fn.dataTable.util.escapeRegex(value.text)+'$': null;
								}
							);
							if (data.length === 0) {
								data = [''];
							}

							//join array into string with regex or (|)
							var val = data.join('|');

							//search for the option(s) selected
							column.search(val ? val : '', true, false).draw();
						});

					column
						.data()
						.unique()
						.sort()
						.each(function (d, j) {
							select.append(
								'<option value="' + d + '">' + d + '</option>'
							);
						});
					$('#select-' + title).select2({
						multiple: true,
						closeOnSelect: true,
						placeholder: 'Choose ' + title,
						width: '300px',
					});
					// Put default value for Vendor and null for other filters in the table
					if ((title = 'company')) {
						$('.select2').val('company 1').trigger('change');
					} else {
						$('.select2').val(null).trigger('change');
					}
				});
		},
	});
    $('#example_table tbody').on( 'click', 'tr', function () {
        // alert( 'Row index: '+table.row( this ).index() );
        // alert( 'Row index: '+ table.row(table.$(':contains("120")')).index() );  // nếu ko có thì undefined
        var idx = table.row(table.$(':contains("126")')).index() // lấy hàng ...
        // alert( 'Row index: '+ table.$(':contains("124")').row().index());
        // table.$(':contains("124")').row().index();
        console.log(table.cell( idx, 0 ).data()) // in ra dữ liệu hàng 1
        table.cell( idx, 0 ).data( 'Updated' ).draw();  // cột; hàng, cột 0 hàng idx
        console.log(table.cell( idx, 0 ).data()) // in ra dữ liệu hàng 1
        var a = JSON.stringify($('#example_table').DataTable().rows().data().toArray()); // xuất cả bảng ra mảng
        console.log(a);
    } );
});
