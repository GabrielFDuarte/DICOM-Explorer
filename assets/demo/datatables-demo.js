// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable({
    "ordering": false,
    paging: false,
    "searching": false,
    "info": false,
    scrollY: '60vh',
    scroller: true,
    "stripeClasses": ['strip1', 'strip2'],
    responsive: true
  });
});
