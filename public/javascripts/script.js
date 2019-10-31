$('.list-lecture').on('click', 'li' ,function(e) {
    const code = $(this).attr('data-code');
    const url = `/courses/course/${code}`;
    fetch(url)
    .then(res => res.json())
    .then(res =>{
      const course = res.course;
      $('.modal-body > .lecture-title').text(course.lecture);
      $('#time').text(`강의 시간 : ${course.start_time}:00 - ${course.end_time}:00 | (${course.dayofweek})`);
      $('#code').text(`교과목 코드 : ${course.code}`);
      $('#professor').text(`담당 교수 : ${course.professor}`);
      $('#location').text(`강의실 : ${course.location}`);
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

$('.form-control').on("propertychange change keyup paste input", function(){
  const inputData = $('.form-control').val();
  const url = `/courses/search?q=${inputData}`;
  fetch(url)
  .then( res => res.json())
  .then( res => {
    const searchData = res.searchData;
    $('.list-lecture *').remove()
    $.each(searchData, function(index, item){
      $('.list-lecture').append(`
        <li class='card-lecture' data-code=${item.code}>
          <a class='lecture-title' href='#'> ${item.lecture}</a>
          <h6 class='lecture-time'>
            <i class='material-icons ic-lecture-info'> access_time </i>
            <span> ${item.start_time}:00 - ${item.end_time}:00 | (${item.dayofweek})</span>
          </h6>
          <ul class='list-lecture-info'>
            <li> 교과목 코드 : ${item.code} </li>
            <li> 담당 교수 : ${item.professor}</li>
            <li> 강의실 : ${item.location}</li>
          </ul>
        </li>`)
    })
  })
});