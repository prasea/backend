// for (let i = 0; i < document.querySelectorAll('button').length; i++) {
//   document.querySelectorAll('button')[i].addEventListener('click', () => {
//     document.querySelector('h1').style.color = "purple";
//   })
// }
$('h1').addClass("big-title margin-50");
$('button').on("click", () => {
  // $('h1').css('color', 'purple');
  $('h1').slideToggle();
})

let text = "";
$('input').keypress(e => {
  text += e.key;
  $('h1').text(text)
})

$("h1").on("mouseover", (e) => {
  $("h1").css("color", "purple")
})

