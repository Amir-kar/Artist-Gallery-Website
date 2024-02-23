$(document).ready(function() {
    addPostToPage(setNum);

    //create commit
    $("#sendCom").click(function(){
        var send={
            name:"a1Ajax",
            email:"ajax@ajax.com",
            body: $('#createCom').val()
        }
        var thisBut = $(this);
        let comment1="<div class=\"d-flex flex-start mb-4\"><div class=\"card w-100\"><div class=\"card-body p-4\"><h6>NEW</h6><div class=\"name\"><h5>Johny Cash</h5><p>";
        let comment2="<div class=\"d-flex justify-content-between align-items-center\"><div class=\"d-flex align-items-center\"></div></div></div></div></div></div>";

        $.ajax({

            method: "POST",
            url:"comment/add/"+thisBut.data("id"),
            dataType: 'json',
            data:JSON.stringify(send),
            contentType: "application/json",
            success: function(html) {
                document.getElementById("createCom").value = "";
                thisBut.closest(".overlay-content").find("#inner").prepend(comment1+html.body+comment2);
            },
            error: function(xhr, status, error){
               alert(JSON.parse(xhr.responseText).body);
            }
        });
    });
    $("#addPosts").on("click",".noButton", function(){
            alert("you may only "+$(this).data("reason")+" once");
        });

    //upvote
    $("#addPosts").on('click',".upvote", function(){

        if($(this).data("loading")==="ready"){
            var thisBut=$(this);

            thisBut.find("i").toggleClass("fas fa-thumbs-up me-1 fa-solid fa-spinner");
            thisBut.attr("data-loading","loading");
            $.ajax({
                url: "post/plus/"+$(this).closest(".mySlides").find(".pic").data("id"),
                type:"POST",
                success: function(result){
                    thisBut.find("i").toggleClass("fa-solid fa-spinner fa-solid fa-thumbs-up");
                    thisBut.toggleClass("upvote noButton").attr("data-reason","upvote");
                    thisBut.find("span").html(result.up);
                },
                error: function(xhr,status, error){
                    alert(JSON.parse(xhr.responseText).body);
                    thisBut.toggleClass("fa-solid fa-spinner fa-regular fa-thumbs-up");
                    thisBut.attr("data-loading","ready");
                }
            });
        }
        else{
            alert("waiting for server feedback");
        }

    });
    //down vote
    $("#addPosts").on('click',".downvote", function(){
            if($(this).data("loading")==="ready"){
                var thisBut=$(this);

                thisBut.find("i").toggleClass("fa-regular fa-thumbs-down fa-solid fa-spinner");
                thisBut.attr("data-loading","loading");
                //$("#downvote").html("<i class=\"fa-solid fa-spinner\"></i>").attr("data-loading","loading");
                $.ajax({
                    url: "post/minus/"+$(this).closest(".mySlides").find(".pic").data("id"),
                    type:"POST",
                    success: function(result){
                        thisBut.find("i").toggleClass("fa-solid fa-spinner fa-solid fa-thumbs-down");
                        thisBut.toggleClass("downvote noButton").attr("data-reason","downvote");
                        thisBut.find("span").html(result.down);
                        //thisBut.html("<i class=\"fa-solid fa-thumbs-down\"></i>").attr("id","noButton").attr("data-reason","downvote");

                    },
                    error: function(xhr,status, error){
                        alert(JSON.parse(xhr.responseText).body);
                        thisBut.toggleClass("fa-solid fa-spinner fa-regular fa-thumbs-down");
                        thisBut.attr("data-loading","ready");
                    }
                });
            }
            else{
                alert("waiting for server feedback");
            }

    });
    $(".next").on("click","#addPosts",function(){
        showSlides(1);
    });
    $(".prev").on("click","#addPosts",function(){
            showSlides(-1);
        });

    //to open Post viewer and the getPost method
    $("#addPosts").on('click',".pic",function(e){
//            alert("value"+$(this).data("value"));
        playCoolAni();
        let comment1="<div class=\"d-flex flex-start mb-4\"><div class=\"card w-100\"><div class=\"card-body p-4\"> <div class=\"name\"><h5>Johny Cash</h5><p>";
        let comment2="<div class=\"d-flex justify-content-between align-items-center\"><div class=\"d-flex align-items-center\"></div></div></div></div></div></div>";
        $.ajax({
            url: "post/getPost/"+$(this).closest(".mySlides").find(".pic").data("id"),
            method: 'get',
            dataType:'json',
            success: function(result){
                $('#div1').replaceWith($('<img />').attr('src', result.imgURL).attr('class','test').attr('id','div1'));
                $("#sendCom").attr("data-id",result.id);
                $.each(result.comments, function(index,value){
                    $( "#inner" ).append( comment1+this.body+comment2 );
                });
                           // json.forEach(function(result.comments){$( "#inner" ).append( "<h1>Test</h1>" ); });
            //                $("#div1").html("<img th:src=result.imgURL>");
            }
        });
    });
//    showSlides(slideIndex);
});

function showAlert() {
    alert("The button was clicked!");
}
let slideIndex = 1;


function plusSlides(n) {
        showSlides(slideIndex + n);


}

function currentSlide(n) {
    showSlides(slideIndex = n);
}
function playCoolAni(){
    if(document.getElementById("overlappland").style.width !="100%"){
        document.getElementById("overlappland").style.width = "100%";}
    else
        document.getElementById("overlappland").style.width = "0%";
           // $(".overlappland").toggle();
    $("#inner").empty();
    $("#div1").empty();
}
var setNum=0;
const theComments=[];
function showSlides(n) {
    console.log(n%6);
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");

    if (n > slides.length) {
        addPostToPage(setNum+=1);
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if(n%6 == 1 && slideIndex%6 == 0){
        toRows(setNum+=1);
        console.log("moved forward");
    }
    if(n%6 == 0 && slideIndex%6 == 1){
        toRows(setNum-=1);
        console.log("moved back");
    }
    slideIndex=n;
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
//        }
//        else{
//                alert("We have no more to show.");
//            }
}
var currentSlideNum=1;
function addPostToPage(k){
    $.ajax({
        method:"GET",
        url:"/post/getPosts/"+k,
        success:function( result){

            //before ID, display none
            var comment1="<div class=\"mySlides\" style=\" display:none;\"> <div class=\"pic\" data-id=\"";
            //Before ImgURL
            var comment2="\"><img src=\"";
            //before thumbs up has right and left button
            var comment3="\" class=\" frontImg\" style=\"width:100%\"></div> <a class=\"prev\" onclick=\"plusSlides(-1)\">❮</a><a class=\"next\" onclick=\"plusSlides(1)\">❯</a><div class=\"caption-container\"> <div class=\"d-flex justify-content-center align-items-center\"><div class=\"d-flex align-items-center\"><span class=\" link-muted me-2 upvote\"  data-loading=\"ready\"><i class=\"fas fa-thumbs-up me-1\"></i><span>";
            //before thumbs up only right style=\"color: grey;\"
            var comment32="\" class=\" frontImg\" style=\"width:100%\"></div> <a class=\"prev\" ></a><a class=\"next\" onclick=\"plusSlides(1)\">❯</a><div class=\"caption-container\"> <div class=\"d-flex justify-content-center align-items-center\"><div class=\"d-flex align-items-center\"><span class=\" link-muted me-2 upvote\"  data-loading=\"ready\"><i class=\"fas fa-thumbs-up me-1\" ></i><span>";
            //before thumbs up only left
            var comment33="\" class=\" frontImg\" style=\"width:100%\"></div> <a class=\"prev\" onclick=\"plusSlides(-1)\">❮</a><a class=\"next\" ></a><div class=\"caption-container\"> <div class=\"d-flex justify-content-center align-items-center\"><div class=\"d-flex align-items-center\"><span class=\" link-muted me-2 upvote\"  data-loading=\"ready\"><i class=\"fas fa-thumbs-up me-1\" ></i><span>";
            //before thumbs down
            var comment4="</span></span><span  class=\" link-muted me-2 downvote\"  data-loading=\"ready\"><i class=\"fas fa-thumbs-down me-1\" ></i><span>";
            //end of comments
            var comment5="</span></span><span class=\" link-muted \"><i class=\"fa-solid fa-comment pic\"></i></span></div></div>";
            //Before ID, display:block
            var comment12="<div  class=\"mySlides\" style=\" display:block;\"> <div class=\"pic\" data-id=\"";//            $("#addPosts").empty();

            //add rows
            var row1="<div class=\"row\">";

            //column before img
            var column1="<div class=\"column\"><img class=\"demo cursor\" src=\"";
            //before currentSlide num
            var column2="\"style=\"width:100%\" onclick=\"currentSlide(";

            //end Column
            var column3=")\" alt=\"The Woods\"></div>";
            var columnAdd="";
            var addPosts="";
            var endDiv="</div>";

            $.each(result, function(index,value){
                if(this.id==1){
                    if(index==0){
                        $( "#addPosts" ).append(comment12+this.id+comment2+this.imgURL+comment33+this.up+comment4+this.down+comment5);
                    }
                    else{
                        $( "#addPosts" ).append(comment1+this.id+comment2+this.imgURL+comment33+this.up+comment4+this.down+comment5);
                    }

                }

                else if(index!=0){
                    $( "#addPosts" ).append( comment1+this.id+comment2+this.imgURL+comment3+this.up+comment4+this.down+comment5 );
                }
                else{
                    if(k==0){
                        $( "#addPosts" ).append(comment12+this.id+comment2+this.imgURL+comment32+this.up+comment4+this.down+comment5);
                    }
                    else{
                        $( "#addPosts" ).append( comment12+this.id+comment2+this.imgURL+comment3+this.up+comment4+this.down+comment5 );
                    }

                }

                columnAdd+=column1+this.imgURL+column2+(currentSlideNum++)+column3;
            });
            theComments[k]=row1+columnAdd+endDiv;
            $("#addRow").html(theComments[k]);
        }
    });
}
function toRows(k){
    if(theComments.length>= k ){
        $("#addRow").html(theComments[k]);
    }
    else{
        setNum--;
    }
}