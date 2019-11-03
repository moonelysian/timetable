$('.list-lecture').click(function(e){
    const tag = e.target.tagName;
    const whitelist = ['LI','SPAN','H6','A']
    if(!whitelist.includes(tag)) return;
    else{
      const code = $(e.target).closest('li.card-lecture').attr('data-code');
      const url = `/courses/course/${code}`;
      fetch(url)
      .then(res => res.json())
      .then(res =>{
        const course = res.course;
        $('.modal-body > .lecture-title').text(course.lecture);
        $('#time').text(`강의 시간 : ${course.start_time}:00 - ${course.end_time}:00 | (${course.dayofweek})`);
        
        $('#code').attr('data-code', course.code);
        $('#code').text(`교과목 코드 : ${course.code}`);
        
        $('#professor').text(`담당 교수 : ${course.professor}`);
        $('#location').text(`강의실 : ${course.location}`);
        $('#modal-lecture-info').modal('show');
      });
    }
});
  
$('.lecture-time > a').click(function () {
  const table_id = $(this).attr('data-lecture')
  const url = `/timetable/${table_id}`
  fetch(url)
  .then(res => res.json())
  .then(res => {
    const course = res.course;
    $('.modal-body > .lecture-title').text(course.course_name);
    $('#lecture-time').text(`강의 시간 : ${course.course_start}:00 - ${course.course_end}:00 | (${course.course_day})`);
      
    $('#lecture-code').attr('data-lecture', course.id);
    $('#lecture-code').text(`교과목 코드 : ${course.course_code}`);
      
    $('#lecture-professor').text(`담당 교수 : ${course.course_professor}`);
    $('#lecture-location').text(`강의실 : ${course.course_location}`);

    $('#memo *').remove();
    const memos = res.memos;
    memos.forEach(function(memo){
    $('#memo').append(`
    <li class='memo-list' data-memo=${memo.id}>
      <div class='memo-content' data-toggle='tooltip' data-placement='top' title='' data-original-title='${memo.content}'>
        <i class='material-icons ic-lecture-noti'> assignment </i>
        <span class='lecture-noti-title'> ${memo.title} </span>
      </div>
      <div class='memo-btn'>
        <a id='delete-memo' href=''>
          <i class='material-icons ic-lecture-noti'> delete </i>
        </a>
      </div>
    </li>`);
    })

    $('#modal-lecture-task').modal('show');
  })
});

$('body').tooltip({
  selector: '[data-toggle="tooltip"]'
})

$(function () {
  $('[data-toggle="popover"]').popover({
    container: 'body',
    html: true,
    placement: 'right',
    sanitize: false,
    content: $("#PopoverContent").html()
  })
  .on('click', function(){
    $('.submit-memo').click(function(){
      const title = $('.popover #recipient-name').val();
      const content = $('.popover #message-text').val();
      const tableId = $('#lecture-code').attr('data-lecture');
      const url = '/memos';
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
          tableId: tableId
          })
      })
      .then(res=>res.json())
      .then(res => {
        alert(res.message);
        location.reload();
      })
    })
  })
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

$('.submit-course').click(function(){
  const course_code = $('#code').attr('data-code');
  const url = `/timetable`;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify( { code: course_code } )
  })
  .then(res=> res.json())
  .then(res => {
    alert(res.message);
    location.reload();
  })
});

$('.delete-lecture').click(function(){
    const id = parseInt($('#lecture-code').attr('data-lecture'));
    const url = `/timetable/${id}`;
    fetch(url, { method: 'DELETE' })
    .then(res => res.json())
    .then(res => {
      alert(res.message);
      location.reload()
    })
})

$(document).on('click' , '#delete-memo', function(){
  const memoId = $('.memo-list').attr('data-memo');
  console.log(memoId);
  const url = `/memos/${memoId}`;
  fetch(url, {method: 'DELETE'})
  .then(res=> res.json())
  .then(res => {
    alert(res.message);
    location.reload();
  })
})