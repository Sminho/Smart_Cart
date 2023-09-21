
/**@brief NFC태그 쿼리문?cart_id=001 */
const params = new URLSearchParams(location.search);
const cart_id = params.get('cart_id');
console.log(cart_id); 

/** FIREBASE 기본설정 */
const firebaseConfig = {
    apiKey: "AIzaSyCFXAGYXxytQ-KPO-0mklGgekcz3VRhX9Q",
    authDomain: "jjmart1398.firebaseapp.com",
    databaseURL: "https://jjmart1398-default-rtdb.firebaseio.com",
    projectId: "jjmart1398",
    storageBucket: "jjmart1398.appspot.com",
    messagingSenderId: "620951825210",
    appId: "1:620951825210:web:db20be5012fdaaacfafe03"
  };
  firebase.initializeApp(firebaseConfig);

  /** Firebase의 기본 참조를 만듭니다. */
const storageRef = firebase.storage().ref();
const db = firebase.firestore();
var authButton1 = $(".navb-button");
var authButton2 = $(".item-button a");
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (firebase.auth().currentUser) {
    console.log(user.uid);
    console.log(user.email);
    if (window.location.pathname == "/cart.html") {
      $('#userInfo').text(user.email+" 고객님");
      $('#cartInfo').text(cart_id+"번 카트를 사용하시겠습니까?");
      $('.login-form').hide();
      $('#cartInfo').show();
      $('#start').show();
      $('.intro').show();
    }
    if (window.location.pathname == "/checkout.html") {
      $('#checkUser').text(user.email);

      const selectEl = document.getElementById('selectTime');
      const dbRef = firebase.database().ref(user.uid); // user.uid를 경로로 하는 데이터베이스 참조

      dbRef.once('value', (snapshot) => { // 한 번만 데이터베이스에서 데이터 가져오기
        snapshot.forEach((childSnapshot) => { // 각 하위 경로에 대해 반복
          const childKey = childSnapshot.key; // 하위 경로의 이름
          const optionEl = document.createElement('option'); // option 요소 생성
          optionEl.value = childKey; // option 요소의 value 속성에 하위 경로의 이름 할당
          optionEl.textContent = childKey; // option 요소의 내용에 하위 경로의 이름 할당
          selectEl.appendChild(optionEl); // select 요소에 option 요소 추가
        });
      });
    }
    authButton1.text("Logout");
    authButton1.attr("href", "#");
    authButton2.text("Logout");
    authButton2.attr("href", "#");
    
    // 로그아웃 처리
    authButton1.on("click", function() {
      firebase.auth().signOut();
    });
    authButton2.on("click", function() {
      firebase.auth().signOut();
    });
  } else {
    if (window.location.pathname == "/checkout.html") {
      Swal.fire({
        icon: 'warning',
        title: '로그인 해주세요!',
        text: '영수증을 받기 위한 정보가 필요해요!',
        }).then(function() {
          window.location.href = '/auth.html';
        });
    }
    console.log("notlogined")
    authButton1.text("Login");
    authButton1.attr("href", "/auth.html");
    authButton2.text("Login");
    authButton2.attr("href", "/auth.html");
  }
});

 /**************************************************** ADMIN **********************************************************************/
if (window.location.pathname == "/admin.html") {
  firebase.auth().onAuthStateChanged(function(user) {
    if (firebase.auth().currentUser) {
    console.log(user.uid);
    console.log(user.email);
    if (user.uid != "PDUBYo6uSHVgmOJ9FzDMngX7f8s2") {
    Swal.fire({
      icon: 'warning',
      title: '권한이 없습니다.',
      text: '관리자만 접근할 수 있어요.',
      }).then(function() {
        history.back();
      });
    }
else{
const rootRef = firebase.database().ref();
let classes = [];
let userValue, weightValue, predictionsText,pendingValue;
// 'pending' 변수 읽기
rootRef.child('pending').once('value', snapshot => {
  const predictionDiv = document.querySelector('.prediction');
  pendingValue = snapshot.val();
  if(pendingValue !=0){
  $('#pendingCart').text("카트 : "+pendingValue);
  rootRef.child(`${pendingValue}/user`).once('value', snapshot => {
    userValue = snapshot.val();
    $('#pendingUser').text("고객 : "+userValue);
  });
  rootRef.child(`${pendingValue}/weight`).once('value', snapshot => {
    weightValue = snapshot.val();
    predictionsText = `Weight : ${weightValue}g   `;
  });

  // 'pending/img' 경로로 이동하여 데이터 읽기
  rootRef.child(`${pendingValue}/img`).once('value', snapshot => {
    const imgValue = snapshot.val();
    console.log('img:', imgValue);

    // URL을 사용하여 이미지를 로드합니다.
    const img = document.getElementById('product-img');
    img.src = imgValue;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      cocoSsd.load({ base: 'lite_mobilenet_v2' }).then(model => {
        // 이미지 객체 인식 수행
        model.detect(img).then(predictions => {
          console.log('Predictions: ');
          console.log(predictions);
          classes = predictions.map(prediction => prediction.class);
          
          predictionsText += 'Predictions: \n';
          // 결과 반복
          predictions.forEach(prediction => {
            // 레이블과 확률 텍스트
            const text = prediction.class + ' - ' + Math.round(prediction.score * 100) + '%';
            const { class: className, score } = prediction;
            var price = calculate(className);
            weightValue -= verify(className);
            predictionsText += `{Class: ${className}, Score: ${score}} = ${price}원\n`;
            // 테두리 그리기
            const box = document.createElement('div');
            box.style.position = 'absolute';
            box.style.left = (prediction.bbox[0] + document.getElementById('product-img').offsetLeft) + 'px';
            box.style.top = (prediction.bbox[1] + document.getElementById('product-img').offsetTop) + 'px';
            box.style.width = prediction.bbox[2] + 'px';
            box.style.height = prediction.bbox[3] + 'px';
            box.style.border = '2px solid red';
      
            // 레이블과 확률 표시
            const label = document.createElement('div');
            label.style.position = 'absolute';
            label.style.top = (prediction.bbox[1] + document.getElementById('product-img').offsetTop - 20) + 'px';
            label.style.left = (prediction.bbox[0] + document.getElementById('product-img').offsetLeft) + 'px';
            label.style.backgroundColor = 'red';
            label.style.color = 'white';
            label.style.fontSize = '12px';
            label.style.fontWeight = 'bold';
            label.style.padding = '5px';
            label.innerText = text;
      
            document.body.appendChild(box);
            document.body.appendChild(label);
          });
          if(weightValue<10) {
            predictionsText += `무게 오차 : ${weightValue}g 예측이 거의 정확합니다.\n`;
          }
          else{
            predictionsText += `무게 오차 : ${weightValue}g 검증이 필요합니다.\n`;
          }
          predictionDiv.textContent = predictionsText;
        });
      }).catch(error => {
        // 에러 핸들링
        console.error(error);
      });
    };
  });
}
else{
  setTimeout("location.reload()", 2000);
}
});

$("#approve").click(function() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    let date = ("0" + currentDate.getDate()).slice(-2);
    let hours = ("0" + currentDate.getHours()).slice(-2);
    let minutes = ("0" + currentDate.getMinutes()).slice(-2);
    let formattedDate = year + "-" + month + "-" + date + "-" + hours + ":" + minutes+ "";
    var database = firebase.database();
    // 눌렀을 때 실행할 함수
    for (var i = 0; i < classes.length; i++) {
      firebase.database().ref(userValue+"/"+formattedDate).update({
            [i] : classes[i]
      });
    }
    
    firebase.database().ref(pendingValue+"/").update({
      gate : 2
    });
    firebase.database().ref().update({
      pending : 0
    });
          Swal.fire({
              icon: 'success',
              title: '거래를 처리하였습니다.',
              text: '데이터 베이스를 확인하세요.',
          }).then(function() {
            location.reload();
          });
  });
    }}
else{
  Swal.fire({
    icon: 'warning',
    title: '권한이 없습니다.',
    text: '관리자만 접근할 수 있어요.',
    }).then(function() {
      history.back();
    });
}
});
}
/**************************************************** Checkout **********************************************************************/
$('.card').hide();
$('#selectTime').on('change', function() {
  const selectedTime = $('#selectTime').val();
  console.log(selectedTime);
  if(selectedTime != "구매한 시간 선택"){
  $('.section-1').hide();
  $('.card').show();
  $('#reciptTime').text(selectedTime);
  if (firebase.auth().currentUser) {
    $('.items').empty(); // #myDiv 내용을 모두 비움
    let dbREF = firebase.auth().currentUser.uid+"/"+selectedTime;
    const db = firebase.database().ref(dbREF);
    db.once("value")
    .then(function(snapshot) {
      var total = 0;
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        console.log(childKey, childData);
        var price = calculate(childData);
        total += price;

        var item = `
        <hr>
        <div class="row">
          <div class="col-xl-10">
            <p>${childData}</p>
          </div>
          <div class="col-xl-2">
            <p class="float-end">${price}원</p>
          </div>
        </div>
      `;
      $('.items').append(item);
      });
      var item = `
      <div class="row text-black">
        <hr style="border: 2px solid black;">
        <div class="col-xl-12">
          <p class="float-end fw-bold">Total: ${total}원</p>
        </div>
        <hr style="border: 2px solid black;">
      </div>
      `;
      $('.items').append(item);
    });
  }
}
else{
  $('.card').hide();
  $('.section-1').show();
}
});

/** 상품가격 함수 */
function calculate(product) {
  let result;

  switch (product) {
    case 'banana':
      result = 1200;
      break;
    case 'apple':
      result = 1500;
      break;
    case 'orange':
      result = 1800;
      break;
    default:
      result = 1000;
  }
  return result;
}

function verify(product) {
  let result;

  switch (product) {
    case 'banana':
      result = 50;
      break;
    case 'apple':
      result = 50;
      break;
    case 'orange':
      result = 50;
      break;
    default:
      result = 50;
  }
  return result;
}
  /**************************************************** Login **********************************************************************/
  if (window.location.pathname == "/auth.html") {
  $('.signup-form').hide();

    $('.signup-show').click(function(){
      $('.signup-form').show();
      $('.login-form').hide();
    })
    $('.login-show').click(function(){
      $('.login-form').show();
      $('.signup-form').hide();
    })
    $('#signup').click(function(event){
      event.preventDefault(); // 폼 제출 이벤트의 기본 동작 막기
      var email = $("#signupEmail").val();
      var password = $("#signupPassword").val();
      console.log(email,password);
    
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("create success");
        var user = userCredential.user;
        console.log(userCredential);
        Swal.fire({
          icon: 'success',
          title:'가입성공!',
          text: '로그인 페이지로 이동합니다.',
          }).then(function() {
            window.location.href = '/auth.html';
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: '가입에 실패했어요',
          text: '입력한 정보를 확인하세요.',
        })
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.message);
        console.log(error.code);
      });
    });
    
    $('#login').click(function(event){
      event.preventDefault(); // 폼 제출 이벤트의 기본 동작 막기
      var email = $("#loginEmail").val();
      var password = $("#loginPassword").val();
      console.log(email,password);
    
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        var user = userCredential.user;
        if (email == "admin@admin.com") {
          Swal.fire({
            icon: 'success',
            title:'관리자 로그인',
            text: '관리자 페이지로 이동합니다.',
            }).then(function() {
              window.location.href = '/admin.html';
            });
        }
        else{
          history.back();
        }
      })
      .catch((error) => {
        console.log("login fail");
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.message);
        console.log(error.code);
        Swal.fire({
          icon: 'error',
          title: '로그인에 실패했어요',
          text: '입력한 정보를 확인하세요.',
      }).then(function() {
        location.reload();
      });
      });
    });
  }

/**************************************************** Cart**********************************************************************/
  if (window.location.pathname == "/cart.html") {
    $('.intro').hide();
    $('.signup-form').hide();
    $('#cartInfo').hide();
    $('#start').hide();
    
    $('.signup-show').click(function(){
      $('.signup-form').show();
      $('.login-form').hide();
    })
    $('.login-show').click(function(){
      $('.login-form').show();
      $('.signup-form').hide();
    })
    $('#signup').click(function(event){
      event.preventDefault(); // 폼 제출 이벤트의 기본 동작 막기
      var email = $("#signupEmail").val();
      var password = $("#signupPassword").val();
      console.log(email,password);
    
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("create success");
        var user = userCredential.user;
        console.log(userCredential);
        Swal.fire({
          icon: 'success',
          title:'가입성공!',
          text: '로그인을 마쳐주세요.',
          }).then(function() {
            window.location.href = '/cart.html?'+cart_id;
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: '가입에 실패했어요',
          text: '입력한 정보를 확인하세요.',
        });
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.message);
        console.log(error.code);
      });
    });

    $('#login').click(function(event){
      event.preventDefault(); // 폼 제출 이벤트의 기본 동작 막기
      var email = $("#loginEmail").val();
      var password = $("#loginPassword").val();
      console.log(email,password);
    
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        var user = userCredential.user;
        if (email == "admin@admin.com") {
          Swal.fire({
            icon: 'success',
            title:'관리자 로그인',
            text: '관리자 페이지로 이동합니다.',
            }).then(function() {
              window.location.href = '/admin.html';
            });
        }
        else{
            $('.login-form').hide();
        }
      })
      .catch((error) => {
        console.log("login fail");
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.message);
        console.log(error.code);
        Swal.fire({
          icon: 'error',
          title: '로그인에 실패했어요',
          text: '입력한 정보를 확인하세요.',
      });
      });
    });
    $('#start').click(function(event){
      firebase.auth().onAuthStateChanged(function(user) {
        if (firebase.auth().currentUser) {
        console.log(user.uid);
        firebase.database().ref(cart_id).update({
          user : user.uid,
        }).catch((error) => {
          console.log("fail");
        });
        Swal.fire({
          icon: 'success',
          title:'등록완료',
          text: '정산 페이지로 이동합니다.',
          }).then(function() {
            window.location.href = '/checkout.html';
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: '로그인 정보가 없어요.',
            text: '로그인 해주세요.',
        });
        }
      });
    });
    }