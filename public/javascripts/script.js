$('.card-lecture').click(function(e) {
  const code = $(this).attr('id');
  const url = '/courses/' + code
  fetch(url)
  .then(res => res.json())
  .then(res =>{
    console.log(res);
    $('#modal-lecture-info').modal('show');
  });
  });
  
  $('.lecture-time > a').click(function () {
    $('#modal-lecture-task').modal('show');
  });
  
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
  
  $(function () {
    $('[data-toggle="popover"]').popover({
      container: 'body',
      html: true,
      placement: 'right',
      sanitize: false,
      content: function () {
      return $("#PopoverContent").html();
      }
    });
  });

$('.form-control').keydown(function(key){
  if(key.keyCode==13){
    const data = $('.form-control').val();
    const url = '/courses/search/' + data;
    fetch(url)
    .then((res) => {
      console.log(res);
      redi
    });
  }
});