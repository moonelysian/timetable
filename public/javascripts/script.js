$('.card-lecture').click(function(e) {
  const code = $(this).attr('id');
  const url = '/courses/' + code
  fetch(url)
  .then(res => res.json())
  .then(res =>{
    console.log(res.course);
    const course = res.course
    $('.modal-body > .lecture-title').text(course.lecture);
    $('#time').html(`강의 시간 : ${course.start_time}:00 - ${course.end_time}:50 | (${course.dayofweek})`);
    $('#code').html(`교과목 코드 : ${course.code}`);
    $('#professor').html(`담당 교수 : ${course.professor}`);
    $('#location').html(`강의실 : ${course.location}`);
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