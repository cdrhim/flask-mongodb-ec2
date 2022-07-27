$(window).scroll(function(){
    if ($(window).scrollTop() >= 400) {
        $('nav').addClass('fixed-header');
        $('nav div').addClass('visible-title');
    }
    else {
        $('nav').removeClass('fixed-header');
        $('nav div').removeClass('visible-title');
    }
});

$(document).ready(function(){
    set_temp()
    show_comment()
});
function set_temp(){
    $.ajax({
        type: "GET",
        url: "http://spartacodingclub.shop/sparta_api/weather/seoul",
        data: {},
        success: function (response) {
            $('#temp').text(response['temp'])
        }
    })
}
function save_comment(){
    $.ajax({
        type: 'POST',
        url: '/homework',
        data: {sample_give:'데이터전송'},
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    })
}
function show_comment(){
    $.ajax({
        type: "GET",
        url: "/homework",
        data: {},
        success: function (response) {
            alert(response["msg"])
        }
    });
}

$(document).ready(function () {
    show_bucket();
});

function show_bucket() {
    // $('#bucket-list').empty()

    $.ajax({
        type: "GET",
        url: "/bucket",
        data: {},
        success: function (response) {
            let rows = response["bucket"]

            for (let i = 0; i < rows.length; i++) {
                let bucket = rows[i]['bucket']
                let num = rows[i]['num']
                let done = rows[i]['done']
                let temp_html=``

                if(done==0){
                    temp_html=`<li>
                                    <h2>✅ ${bucket}</h2>
                                    <button onclick="done_bucket(${num})" type="button" class="btn btn-outline-primary">완료!</button>
                               </li>`
                } else {
                    temp_html=`<li>
                                    <h2 class="done">✅ ${bucket}</h2>
                                    <button onclick="undo_bucket(${num})" type="button" class="btn btn-outline-danger">취소</button>
                               </li>`
                }

                $('#bucket-list').append(temp_html)
            }
        }
    });
}

function save_bucket() {

    let bucket = $('#bucket').val()

    $.ajax({
        type: "POST",
        url: "/bucket",
        data: {bucket_give: bucket},
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    });
}

function delete_bucket(num) {

    $.ajax({
        type: "POST",
        url: "/bucket/delete",
        data: {num_give: num},
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    });
}

function done_bucket(num) {

    $.ajax({
        type: "POST",
        url: "/bucket/done",
        data: {num_give: num},
        success: function (response) {
            alert(response["msg"])
        }
    });
    window.location.reload()
}

function undo_bucket(num){
    $.ajax({
        type: "POST",
        url: "/bucket/notdone",
        data: {num_give: num},
        success: function (response) {
            alert(response["msg"])
        }
    });
    window.location.reload()
}

if (done == 0){
    temp_html = `
                             <li>
                             <h2>✅ ${bucket}</h2>
                             <button  onclick="done_bucket(${num})" type="button" class="btn btn-outline-primary">완료!</button>
                               </li>
                            `
} else {
    temp_html=`
                             <li>
                             <h2 class="done">✅ ${bucket}</h2>
                             <button  onclick="not_done_bucket(${num})" type="button" class="btn btn-outline-primary">취소</button>
                         </li>
                            `
}