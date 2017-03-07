(function() {

  //表のインスタンスを取得
  const setControl = () => {
    ctrlChooseList = $('#chooseList');
    ctrlQueueList = $('#queueList');
  }

  // Webサーバにデータを送る
  const sendData = json => {
    const url = 'https://...';

    $.ajax({
      type: "POST",
      url: url,
      data: 'json',
      success: res => {
        console.log(res);
      }
    });
  };

  // IoT hubからWebSocketでデータを取得する
  const getStatusFromIoTHub = () => {
    const url = '';
    const ws = new WebSocket(url);

    webSocket.onopen = evt => {
      console.log('open');
    };

    webSocket.onmessage = evt => {
      console.log(event.data)
    };

    webSocket.onclose = evt => {};

    webSocket.onerror = evt => {
      console.log(evt);
    };
  }

  //プログラムの開始
  window.onload = () => {
    setControl();
    // setEventHandlers();
    getData();
  }
})();

let ctrlChooseList;
let ctrlQueueList;
let queuCnt = 0;

//キューリストに追加
const appendItemToQueue = selectedItem => {
  const newItem = $(selectedItem).clone();
  $(newItem).append("<td class='status'></td>");
  const menu = '<div class="dropdown">' +
    '<button class="btn btn-info dropdown-toggle" type="button" data-toggle="dropdown">Action<span class="caret"></span></button>' +
    '<ul class="dropdown-menu">' +
    '<li><a href="#" id="action-a">AAAA</a></li>' +
    '<li><a href="#" id="action-b">BBBB</a></li>' +
    '<li><a href="#" id="action-stop">Stop</a></li>' +
    '</ul>' + '</div>';

  $(document).on("click", '#action-stop', e = () => {
    console.log('stop');
  });

  const actionMenu = $('<td>').attr('class', 'action').append(menu);
  $(newItem).append(actionMenu)

  $(newItem).attr('id', 'qID' + queuCnt);
  $().on('click', evt => {
    let target = $(evt.target);
    if (target[0].tagName == 'TD') {
      target = target[0].parentNode;
    }

    $(target).css("color", "#c90000");
    $(target).find('.status').text('clicked');

    const val1 = $(target).find('.c1').text();

    const json = {
      val1: val1
    }
    sendData({});
  });

  queuCnt++;

  $('#queueList tbody').append($(newItem));
  $(selectedItem).remove();
  queuCnt++;
}

let count = 0;

const showData = data => {
  console.log(data);

  let head = $('<tr>').addClass('caption');
  let row = $('<tr>').addClass('item').attr('id', 'item' + count++);

  for (let key in data) {
    const keyTD = $('<td>').attr('class', 'key').text(key);
    head = $(head).append(keyTD);
    const col = $('<col span="1">').attr('id', 'col-' + key);
    $('table#chooseList thead').after(col);
  }
  $('table#chooseList thead').append(head);

  const cloned_head = head.clone();
  $(cloned_head).append('<td class="status">Status</td>');
  $(cloned_head).append('<td class="action">Action</td>');
  $('table#queueList thead').append(cloned_head);

  for (let key in data) {
    const value = data[key];
    // const keyTD = $('<td>').attr('class', 'key').text(key);
    const valueTD = $('<td>').attr('class', key).text(value);
    row = $(row).append(valueTD);
  }

  $(row).on('click', () => {
    appendItemToQueue(row);
  });
  $('table#chooseList tbody').append(row);
}


// Webサーバからデータを取得する
const getData = () => {
  const url = 'http://...';

  $.ajax({
    type: "GET",
    url: url,
    dataType: 'json',
    success: res => {
      console.log(res);
      showData(JSON.parse(res));
    },
    error: res => {
      console.log(res);
    }
  });

};