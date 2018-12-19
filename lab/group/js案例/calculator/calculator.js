/*
 ** global vars
 */
$(function () {
  setTimeout(function () {
    $('#jsq_the-buttons').find('button').removeClass('btn');

  }, 0);
});
var a = 0,
  b = 0,
  is_a = true,
  is_b = false,
  o = 'nil',
  answer = 0,
  first_a = true,
  first_b = true,
  is_submission = false,
  soft_sub = false,
  display = $('#jsq_total');
calculatorText = '';
calculatorExpression = '';



/*
 ** tool functions
 */

// console.log
// function console.log(x) {
//   console.log(x);
// }
// add int to current display value
function changeDisplayVal(i) {
  display.text(display.text() + i);
}
// make * into ×
function visOps(x) {
  if (x === '*') {
    // return 'u00D7';
    return '×';
  } else if (x === '/') {
    // return 'u00F7';
    return '÷';
  } else {
    return x;
  }
}


// set display value
function setDisplayVal(x) {
  display.text(visOps(x));
}
// make touch animation
function animateButton(obj) {
  var button = obj.addClass('hovering');
  setTimeout(function () {
    button.removeClass('hovering');
  }, 100);
}



/*
 ** operation functions
 */

// setting a
function set_a(i) {

  if (is_a) {
    // nothing if a duplicate decimal
    if (i === '.' && a.toString().indexOf('.') !== -1) {
      console.log('Duplicate Decimal');
      i = '';
    } else if (i === '.' && first_a) {
      i = '0.';
    }
    // first_a time, we need to clear the display
    if (first_a === true) {
      if (i === '0') {
        i = '';
      } else {
        // set display value
        setDisplayVal(i);
        // no longer first_a
        first_a = false;
      }
    } else {
      // add int to current display value
      changeDisplayVal(i);
    }

    a = display.text();

    console.log('Set "a" to ' + a);
    a = formateAnswer2(a);
    b = formateAnswer2(b);
    calculatorText = a;
    $('#calculatorText').text(calculatorText);
  }
}

// setting b
function set_b(i) {

  if (!is_a) {
    // nothing if a duplicate decimal
    if (i === '.' && b.toString().indexOf('.') !== -1) {
      console.log('Duplicate Decimal!');
      i = '';
    } else if (i === '.' && first_b) {
      i = '0.';
    }
    // first_b time, we need to clear the display
    if (first_b === true) {
      if (i === '0') {
        if(o==='/'){
          alert('分母不能是0');
          return
        }else{
          setDisplayVal(i)
        }
        // i = '';
      } else {
        // set display value
        setDisplayVal(i);
        // no longer first_b
        first_b = false;
      }
    } else {
      // add int to current display value
      changeDisplayVal(i);
    }
    // set b to current display Value
    b = display.text();

    console.log('Set "b" to ' + b);
    if (powerofFlag == true) {
      powerofB = b;
    }
    a = formateAnswer2(a);
    b = formateAnswer2(b);
    calculatorText = a + '' + o + '' + b;
    calculatorExpression = a + '' + o + '' + b;
    $('#calculatorText').text(calculatorText);
  }
}

// looping calculator
function loop_calc(answer) {
  console.log('Loop Calculator');

  a = answer;
  b = 0;
  answer = 0;
  // set display value
  setDisplayVal(a);
}

// setting operator
function set_o(op) {

  // if answer, loop the calculator to prepare for b
  if (is_submission) {
    loop_calc(display.text());
    is_submission = false;
  }
  // if new op is submitting calc
  if (!first_b&&powerofFlag==false) {
    softsubmit_calc();
  }

  // replace or set operator in display
  setDisplayVal(op);
  // replace or set global operator
  o = op;

  if (is_a) {
    is_a = false;
  }
  if (!is_b) {
    is_b = true;
  }

  console.log('Set "o" to ' + o);
  a = formateAnswer2(a);
  b = formateAnswer2(b);
  if (o != '=') {
    calculatorText = a + '' + o;
    $('#calculatorText').text(calculatorText);
  } else {
    $('#calculatorText').text(calculatorExpression);
  }

}

// soft submit calc
function softsubmit_calc() {
  a = formateAnswer2(a);
  b = formateAnswer2(b);
  // evaluate equation
  var preCalc = eval(a + '' + o + '' + b);
  // parse float to 12
  answer = parseFloat(preCalc.toPrecision(12));

  // submit answer to display
  display.text(answer);

  // reset first_b to true
  first_b = true;

  // post result
  newResult(a, o, b, answer);

  console.log(a + ' ' + o + ' ' + b + ' = ' + answer);

  a = answer;
  b = 0;
  o = o;
  // set display value
  setDisplayVal(o);
  is_a = false;
  is_b = true;

  first_b = true;

  soft_sub = true;
  //2018-07-14 添加is_submission = true;
  // is_submission = true;
  // $('#jsq_results_list').find('li').eq(0).find('a.calc_use').click();
  console.log('Soft Submission');
}

// submit calculator
function submit_calc() {
  a = formateAnswer2(a);
  b = formateAnswer2(b);

  console.log('Submission');

  if (first_b === false || powerofFlag == true) {
    var preCalc = 0;
    if (o === "^" || powerofFlag == true) {
      // evaluate equation

      preCalc = Math.pow(powerofA, powerofB);
          // parse float to 12
      answer = parseFloat(preCalc.toPrecision(12));

      // submit answer to display
      display.text(answer);
      // display is now the answer
      is_submission = true;
      // reset first_b to true
      first_b = true;

      // post result
      newResult(powerofA, '^', powerofB, answer);
      powerofFlag=false;
      return;
    } else {
      // evaluate equation
      preCalc = eval(a + '' + o + '' + b);
    }
    // parse float to 12
    answer = parseFloat(preCalc.toPrecision(12));
    // submit answer to display
    display.text(answer);
    // display is now the answer
    is_submission = true;
    // reset first_b to true
    first_b = true;

    // post result

    newResult(a, o, b, answer);
  
    console.log(a + ' ' + o + ' ' + b + ' = ' + answer);
  } else {
    console.log("You can't do that yet");
  }
  $('#jsq_results_list').find('li').eq(0).find('a.calc_use').click();

}

// negging value
function neg() {
  display.text(display.text() * -1);
  if (is_submission) {
    a = a * -1;
  } else {
    if (is_a) {
      a = a * -1;
      setDisplayVal(a);
    } else {
      b = b * -1;
      setDisplayVal(b);
    }
  }
}

// resetting calculator
function reset_calc() {
  a = 0;
  b = 0;
  o = 'nil';
  answer = 0;
  is_a = true;
  is_b = false;
  first_a = true;
  first_b = true;
  is_submission = false;
  soft_sub = false;
  display.text(0);

  // reset display value
  setDisplayVal(0);
  $('#calculatorText').text('');
  console.log('Calculator Reset');
}

// backspacing value
function backspace() {
  if (display.text() !== '' && display.text() !== '0') {
    display.text(display.text().substring(0, display.text().length - 1));
    if (is_a === true) {
      a = parseFloat(a.toString().substring(0, a.toString().length - 1));
    } else {
      b = parseFloat(b.toString().substring(0, b.toString().length - 1));
    }
  } else {
    console.log('Nothing Left to Backspace');
  }
}

// set value to memory value
function memory(i) {
  if (is_submission) {
    loop_calc(i);
  } else if (is_a) {
    loop_calc(i);
  } else {
    set_b(i);
  }
  answer = a;
}



/*
 ** logging to memory console
 */

function newResult(a, o, b, answer) {
  var results = $('#jsq_results_list');
  var answer = formateAnswer(answer);
  var result = '' +
    '<li title="' + a + ' ' + visOps(o) + ' ' + b + '=' + answer + '" class="result"><div class="equation-box"><span class="equation">' + a + ' ' + visOps(o) + ' ' + b + ' = </span>' +
    ' <span class="answer">' + answer + '</span></div> <span class="use"><a class="calc_use" href="#">使用</a></span></li>';
  results.prepend(result).children('li').fadeIn(200);
  if ($('#jsq_result_default')) {
    $('#jsq_result_default').remove();
  }
  // click use
  $('.calc_use').off('click').on('click', function () {
    var i = $(this).parent('.use').siblings('.equation-box').find('.answer').text();
    // $(this).parents('.result').animate({'opacity': '0.5'},200).animate({'opacity': '1'},200);
    $('#jsq_total').animate({
      'opacity': '0.5'
    }, 200).animate({
      'opacity': '1'
    }, 200);
    // $('#jsq_total').animate({'fontSize': '22px'},200).animate({'fontSize': '16px'},200);
    memory(i);
    return false;
  });
}

/*
 ** 将1234格式化成1,234
 */
function formateAnswer(num) {
  num += '';
  var reg = /(?=(?!(\b))(\d{3})+$)/g;
  if (num.indexOf('.') > 0) {
    var intArea = num.split('.')[0];
    var decimals = num.split('.')[1];
    return intArea.replace(reg, ",") + '.' + decimals;
  } else {
    return num.replace(reg, ",");
  }

}
/*
 ** 将1,234格式化成1234
 */
function formateAnswer2(num) {
  num += '';
  num = num.replace(/,/g, '');
  return num;

}

/*
 ** complex functions
 */

function sqrt(i) {
  i=formateAnswer2(i);
  console.log('Square Root');
  var s = Math.sqrt(i);
  answer = s;
  console.log('u221A' + i + ' = ' + s);
  loop_calc(s);
  newResult('', '√', i, s);
  // submit answer to display
  display.text(answer);
  // display is now the answer
  is_submission = true;
  // reset first_b to true
  first_b = true;
}

function square(i) {
    i=formateAnswer2(i);

  console.log('Square');
  var s = i * i;
  answer = s;
  console.log(i + ' u005E 2 = ' + s);
  loop_calc(s);
  newResult(i, ' &#94; 2', '', s);
  // submit answer to display
  display.text(answer);
  // display is now the answer
  is_submission = true;
  // reset first_b to true
  first_b = true;
}

function denom(i) {
    i=formateAnswer2(i);

  console.log('Denominator');
  var s = 1 / i;
  answer = s;
  console.log('1 / ' + i + ' = ' + s);
  loop_calc(s);
  newResult(1, ' / ', i, s);
  // submit answer to display
  display.text(answer);
  // display is now the answer
  is_submission = true;
  // reset first_b to true
  first_b = true;
}



/*
 ** Usage - Click Events
 */

// click integers
$('.calc_int, #jsq_calc_decimal').each(function () {
  $(this).click(function () {
    var value = $(this).val();
    if (is_submission === false) {
      if (is_a === true) {
        set_a(value);
      } else {
        set_b(value);
      }
    } else {
      reset_calc();
      set_a(value);
    }
  });
});


// click operators
$('.calc_op').each(function () {
  $(this).click(function () {
    var value = $(this).val();
    set_o(value);

  });
});

// click equals
$('#jsq_calc_eval').click(function () {
  is_submission=true;
  submit_calc();

});

// click clear
$('#jsq_calc_clear').click(function () {
  reset_calc();
});

// click neg
$('#jsq_calc_neg').click(function () {
  neg();
});

// click backspace
$('#jsq_calc_back').click(function () {
  backspace();
});

// click square root
$('#jsq_calc_sqrt').click(function () {
  if (display.text() !== '0') {
    if (is_submission) {
      sqrt(answer);
    } else if (is_a) {
      sqrt(a);
    }
  }
  return false;
});

// click square
$('#jsq_calc_square').click(function () {
  if (display.text() !== '0') {
    if (is_submission) {
      square(answer);
    } else if (is_a) {
      square(a);
    }
  }
  return false;
});

powerofFlag = false;
$('#jsq_calc_powerof').click(function () {
  var value = $(this).val();
  powerofFlag = true;
  set_o(value);
  powerofA = a;
  return false;
});

// click denominator
$('#jsq_calc_denom').click(function () {
  if (display.text() !== '0') {
    if (is_submission) {
      denom(answer);
    } else if (is_a) {
      denom(a);
    }
  }
  return false;
});



// reset console
$('#jsq_result_clear').click(function () {
  $('#jsq_results_list').children('li').fadeOut(500, function () {
    $(this).remove();
  });
  $('#jsq_results_list').prepend('<li id="result_default">&nbsp;</li>');
  return false;
});


/*
 ** Key Events
 */

// key press for integers and operators
$(document).keypress(function (e) {
  // the character code
  var charCode = e.which;
  // the key
  var key = String.fromCharCode(charCode);

  // key integers & decimal
  if (charCode >= 46 && charCode <= 58 && charCode !== 47) {
    if (!is_submission) {
      if (is_a) {
        set_a(key);
      } else {
        set_b(key);
      }
    } else if (soft_sub) {
      set_b(key);
    } else {
      reset_calc();
      set_a(key);
    }
  }

  // key operators
  if (charCode >= 42 && charCode <= 45 && charCode !== 44 || charCode === 47) {
    set_o(key);
  }

  // key equals
  if (charCode === 61) {
    submit_calc();
  }

  // animate the corrosponding button
  $('button').each(function () {
    var value = $(this).val();
    if (value === key) {
      animateButton($(this));
    }
  });

});

// keydown for backspace and return
$(document).keydown(function (e) {

  // the character code
  var charCode = e.which;

  // backspace
  if (charCode === 8) {
    backspace();
    animateButton($('#jsq_calc_back'));
    return false;
  }

  // clear
  if (charCode === 12) {
    reset_calc();
    animateButton($('#jsq_calc_clear'));
    return false;
  }

  // return
  if (charCode === 13) {
    submit_calc();
    animateButton($('#jsq_calc_eval'));
    return false;
  }

});
