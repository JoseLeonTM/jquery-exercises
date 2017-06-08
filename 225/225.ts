

// $.ajax({
//     method:'GET',
//     url: 'http://www.bbc.co.uk/radio1/playlist.json',
    // headers:{
        // "Accept":"*",
        // "Access-Control-Request-Headers":"http://www.bbc.co.uk"
        // "Access-Control-Allow-Origin":'*'
    // },
    // dataType:'jsonp',
    // data:{
    //     // q:'*',
    //     format:'json'
    // },
    // jsonp:false,
    // jsonpCallback:'getData',
    // success:function(res){
    //     console.log(res);
    //     top10 = trimData(res);
    //     fillTable(top10);
    // },
    // error:function(er){
    //     console.log("Error: ",er.status);
    // }
// });
//     .then(function(res){
//     console.log("response: ",res);
// },function(er){
//     console.log("Error: ",er.status);
// });

function trimData(data){
    return data.playlist.a.slice(0,10);
}
function createRow(data,index){
    //CREATE THE ELEMENTS
    var row = document.createElement('tr');
    var title = document.createElement('td');
    var artist= document.createElement('td');
    var label = document.createElement('td');
    var img = document.createElement('td');
    var playlist= document.createElement('td');
    var status= document.createElement('td');
    var edit= document.createElement('td');

    //SET THE ID FOR THE ROW AND THE VALUES FOR EACH CELL
    row.id=data.artist_id;
    title.innerText=data.title;
    artist.innerText=data.artist;
    label.innerText=data.label;
    img.innerHTML="<img height='60px' src='"+data.image+"'/>";
    playlist.innerText=data.playlist;
    status.innerText=data.status;
    edit.innerHTML="<button id="+index+">Edit</button>";

    ////////APPEND THE CELLS INTO THE ROW
    row.appendChild(title);
    row.appendChild(artist);
    row.appendChild(label);
    row.appendChild(img);
    row.appendChild(playlist);
    row.appendChild(status);
    row.appendChild(edit);
    return row;
}
function saveData(ev){
    var index = ev.target.className;
    var row = $(tableBody[0].children[index])[0].children;
    var inputs = $('input');
    // var data = top10[ev.target.className];
    // console.log(inputs);
    for(let i=0;i<inputs.length;i++){
        if(i==3){
            row[i].innerHTML="<img height='60px' src='"+inputs[i].value+"'/>";
        }
        else{
            row[i].innerText=inputs[i].value;
        }
    }
    top10[index].title=inputs[0].value;
    top10[index].artist=inputs[1].value;
    top10[index].label=inputs[2].value;
    top10[index].image=inputs[3].value;
    top10[index].playlist=inputs[4].value;
    top10[index].status=inputs[5].value;

    var modal = $('#modal');
    modal.detach();
    ev.preventDefault();

    $.ajax({
    method:'POST',
    data: data,
    url: 'http://www.bbc.co.uk/radio1/artist/id'
    }).then(function(res){
    console.log("response: ",res);
    },function(er){
    console.log("Error: ",er);
    });
}
function closeModal(){
    var modal = $('#modal');
    modal.detach();
}
function editable(ev){
    var row = ev.target.id;
    var d = top10[row];
    var modal = document.createElement('div');
    modal.id='modal';
    modal.innerHTML=[
        '<form>',
            '<div><label for="title">Title:</label>',
            '<input type="text" id="title" value="'+d.title+'" required/></div>',
            '<div><label for="artist">Artist:</label>',
            '<input type="text" id="artist" value="'+d.artist+'" required/></div>',
            '<div><label for="label">Label:</label>',
            '<input type="text" id="label" value="'+d.label+'" required/></div>',
            '<div><label for="img">Image:</label>',
            '<input type="url" id="img" value="'+d.image+'" required/></div>',
            '<div><label for="playlist">Playlist:</label>',
            '<input type="text" id="playlist" value="'+d.playlist+'" required/></div>',
            '<div><label for="status">Status:</label>',
            '<input type="text" id="status" value="'+d.status+'" required/></div>',
            '<button id="save" class="'+row+'">Save</button>',
            '<p id="close">X</p>',
        '</form>'
    ].join('');
    container.append($(modal));
    var save = $('#save');
    save.on('click',saveData);
    var p = $('#close');
    p.on('click',closeModal);
}
function fillTable(data){
    for(let i=0;i<data.length;i++){
        tableBody.append(createRow(data[i],i));
    }
    var buttons = $('button');
    buttons.on('click',editable);
}

var container = $('#container');
var tableBody = $('tbody');
var data = json();
var top10 = trimData(data);
fillTable(top10);
function json(){
    return {"playlist":{"a":[{"title":"Junk Food Forever","artist":"The Amazons","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p050jt2k.jpg","playlist":null,"artist_id":"6d394d8e-df41-4207-8485-08d1e59723b7","status":null},{"title":"Attention","artist":"Charlie Puth","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p051qg19.jpg","playlist":null,"artist_id":"525f1f1c-03f0-4bc8-8dfd-e7521f87631b","status":null},{"title":"No Promises (feat. Demi Lovato)","artist":"Cheat Codes","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p04zd2js.jpg","playlist":null,"artist_id":"8b579b9a-84ef-4975-884f-19e988cfc181","status":null},{"title":"Brazil","artist":"Declan McKenna","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p032455n.jpg","playlist":null,"artist_id":"8b98035f-fbd2-4fb3-9c2f-263c7506680d","status":null},{"title":"I'm The One (feat. Justin Bieber, Quavo, Chance the Rapper & Lil Wayne)","artist":"DJ Khaled","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p051z14f.jpg","playlist":null,"artist_id":"081a2d60-9791-4e05-a075-f1890355eeee","status":null},{"title":"Lost In Your Light (feat. Miguel)","artist":"Dua Lipa","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p05182cg.jpg","playlist":null,"artist_id":"6f1a58bf-9b1b-49cf-a44a-6cefad7ae04f","status":null},{"title":"Unforgettable (feat. Swae Lee)","artist":"French Montana","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p0503jn9.jpg","playlist":null,"artist_id":"45dc5f07-6609-4760-a933-8c9e0f858d05","status":null},{"title":"Bon App\u00e9tit (feat. Migos)","artist":"Katy Perry","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p0519gpt.jpg","playlist":null,"artist_id":"122d63fc-8671-43e4-9752-34e846d62a9c","status":null},{"title":"WALLS","artist":"Kings of Leon","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p051z0yh.jpg","playlist":null,"artist_id":"6ffb8ea9-2370-44d8-b678-e9237bbd347b","status":null},{"title":"Strip That Down (feat. Quavo)","artist":"Liam Payne","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p053c79f.jpg","playlist":null,"artist_id":"93ae8651-24ee-406c-b927-eb7cd773ae38","status":null},{"title":"Malibu","artist":"Miley Cyrus","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p052ncp8.jpg","playlist":null,"artist_id":"7e9bd05a-117f-4cce-87bc-e011527a8b18","status":null},{"title":"Hard Times","artist":"Paramore","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p050jrsf.jpg","playlist":null,"artist_id":"44cf61b8-5197-448a-b82b-cef6ee89fac5","status":null},{"title":"Lights Out","artist":"Royal Blood","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p050bkfm.jpg","playlist":null,"artist_id":"aa62b28e-b6d4-4086-91d4-e5fac1ed56f3","status":null},{"title":"There's Nothing Holdin' Me Back","artist":"Shawn Mendes","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p0517tfc.jpg","playlist":null,"artist_id":"b7d92248-97e3-4450-8057-6fe06738f735","status":null}],"b":[{"title":"Want You Back","artist":"HAIM","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p0521cbc.jpg","playlist":null,"artist_id":"aef06569-098f-4218-a577-b413944d9493","status":null},{"title":"Mask Off","artist":"Future","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p04ty6sr.jpg","playlist":null,"artist_id":"48262e82-db9f-4a92-b650-dfef979b73ec","status":null},{"title":"Thunder","artist":"Imagine Dragons","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p052ndk0.jpg","playlist":null,"artist_id":"012151a8-0f9a-44c9-997f-ebd68b5389f9","status":null},{"title":"Mama (feat. William Singe)","artist":"Jonas Blue","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p0521mkv.jpg","playlist":null,"artist_id":"17678771-5799-4017-851a-319f25b6948d","status":null},{"title":"Passport Home","artist":"JP Cooper","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p051qg0l.jpg","playlist":null,"artist_id":"be1f10dc-3b88-48e6-baa7-95aea6abf2f6","status":null},{"title":"First Time","artist":"Kygo & Ellie Goulding","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p0521t8m.jpg","playlist":null,"artist_id":"ba0e7638-0cd6-4ff4-8987-c3e224d22c23","status":null},{"title":"Amsterdam","artist":"Nothing but Thieves","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p0521fp0.jpg","playlist":null,"artist_id":"7e2e4e3a-4e85-4d5a-b78e-5e4afd467a3e","status":null},{"title":"Oh Woman Oh Man","artist":"London Grammar","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p053c7bz.jpg","playlist":null,"artist_id":"4dbe08c1-b40a-43b3-ab89-210000bd8ab2","status":null},{"title":"Despacito (Remix) (feat. Daddy Yankee & Justin Bieber)","artist":"Luis Fonsi","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p051dh8m.jpg","playlist":null,"artist_id":"d68fda90-ab8d-4799-be56-317ba4ae700f","status":null},{"title":"The Cure","artist":"Lady Gaga","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p050qntw.jpg","playlist":null,"artist_id":"650e7db6-b795-4eb5-a702-5ea2fc46c848","status":null},{"title":"Lust For Life (feat. The Weeknd)","artist":"Lana Del Rey","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p0517t7g.jpg","playlist":null,"artist_id":"b7539c32-53e7-4908-bda3-81449c367da6","status":null},{"title":"Slow Hands","artist":"Niall Horan","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p052mnm1.jpg","playlist":null,"artist_id":"55e6074f-ef78-4ec3-8fff-bd1b8cc8c14a","status":null},{"title":"In The Name Of Man","artist":"Plan B","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p0539n06.jpg","playlist":null,"artist_id":"daf84e36-f78e-4c94-a032-6aed138c0d34","status":null},{"title":"Your Song","artist":"Rita Ora","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p0540xkl.jpg","playlist":null,"artist_id":"c9dd033c-0270-463c-b3ec-f4b7712486fe","status":null},{"title":"Body (feat. Migos)","artist":"Sean Paul","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p028p8r6.jpg","playlist":null,"artist_id":"c3da3346-2643-48a7-93cd-011f6834b3d7","status":null}],"c":[{"title":"Life Of The Party","artist":"All Time Low","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p052216s.jpg","playlist":null,"artist_id":"62162215-b023-4f0e-84bd-1e9412d5b32c","status":null},{"title":"Lonely Side","artist":"Blaenavon","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p0540xhm.jpg","playlist":null,"artist_id":"6fcabcfc-e595-4de5-b3df-ab4ff5aa587b","status":null},{"title":"Crying In The Club","artist":"Camila Cabello","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p054nhv7.jpg","playlist":null,"artist_id":"01b8b5bf-06cb-45da-85fb-61ada72fcd69","status":null},{"title":"Now Or Never","artist":"Halsey","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p052nf9v.jpg","playlist":null,"artist_id":"3377f3bb-60fc-4403-aea9-7e800612e060","status":null},{"title":"Never Enough","artist":"The Hunna","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p051qg0q.jpg","playlist":null,"artist_id":"39c6625e-8312-41f6-8cd0-2648e95f8db1","status":null},{"title":"I Win","artist":"Lethal Bizzle & Skepta","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p0540xrp.jpg","playlist":null,"artist_id":"1155431a-d35e-4863-9ae0-e3c24eb61aa9","status":null},{"title":"Power (feat. Stormzy)","artist":"Little Mix","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p054nhwc.jpg","playlist":null,"artist_id":"38f59974-2f4d-4bfa-b2e3-d2696de1b675","status":null},{"title":"Know No Better (feat. Travis Scott, Camila Cabello & Quavo)","artist":"Major Lazer","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p054phpr.jpg","playlist":null,"artist_id":"75be165a-ad83-4d12-bd28-f589a15c479f","status":null},{"title":"Revolution","artist":"RAT BOY","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p053c7h6.jpg","playlist":null,"artist_id":"5f6554f6-2d20-4676-8fb0-57e8f694a532","status":null},{"title":"Bad Liar","artist":"Selena Gomez","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p0540xl0.jpg","playlist":null,"artist_id":"e4bc69e2-a064-4f93-ada1-f7f209cc1cc3","status":null},{"title":"Come Closer (feat. Drake)","artist":"WizKid","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p04zc14p.jpg","playlist":null,"artist_id":"efc5d365-a448-4e2f-9b5f-4a7c84be725c","status":null},{"title":"Don't Let Me Be Yours","artist":"Zara Larsson","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p054phfs.jpg","playlist":null,"artist_id":"134e6410-6954-45d1-bd4a-0f2d2ad5471d","status":null}],"totw":[{"title":"Cut To The Feeling","artist":"Carly Rae Jepsen","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p054prb4.jpg","playlist":null,"artist_id":"09887aa7-226e-4ecc-9a0c-02d2ae5777e1","status":null}],"introducing":[{"title":"Let Go","artist":"Sody","label":null,"image":"https:\/\/ichef.bbci.co.uk\/images\/ic\/512x512\/p053fc6x.jpg","playlist":null,"artist_id":"f7e6831f-020e-49e1-9724-80561fa6ee6d","status":null}]}}
}