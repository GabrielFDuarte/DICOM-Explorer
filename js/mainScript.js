cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

// this function gets called once the user drops the file onto the div
function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    // Get the FileList object that contains the list of files that were dropped
    const files = evt.dataTransfer.files;

    // this UI is only built for a single file so just dump the first one
    file = files[0];
    const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
    loadAndViewImage(imageId);
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
const dropZone1 = document.getElementById('dicomImage1');
dropZone1.addEventListener('dragover', handleDragOver, false);
dropZone1.addEventListener('drop', handleFileSelect, false);

cornerstoneWADOImageLoader.configure({
    beforeSend: function (xhr) {
        // Add custom headers here (e.g. auth tokens)
        //xhr.setRequestHeader('x-auth-token', 'my auth token');
    },
    useWebWorkers: true,
});

let loaded = false;

function loadAndViewImage(imageId, flagField) {
    var element;
    var imgNum;
    if (flagField) {
        imgNum = 1;
        element = document.getElementById('dicomImage1');
    } else {
        imgNum = 2;
        element = document.getElementById('dicomImage2');
    }
    //const element = document.getElementById('dicomImage');
    cornerstone.loadImage(imageId).then(function (image) {
        console.log(image);
        const viewport = cornerstone.getDefaultViewportForImage(element, image);
        cornerstone.displayImage(element, image, viewport);
        if (loaded === false) {
            loaded = true;
        }

        function formatData(data) {
            return data.substring(0, 4) + "-" + data.substring(4, 6) + "-" + data.substring(6);
        }

        function readTagString(image, tag) {
            let tagValue = image.data.string(tag);
            if (tagValue === undefined) {
                return '(VAZIO)';
            } else {
                return tagValue;
            }
        }

        function readTagStringID(image, tag) {
            let tagValue = image.data.string(tag);
            if (tagValue === undefined) {
                return '(VAZIO)';
            } else {
                return tagValue + ' [' + uids[tagValue] + ']';
            }
        }

        function readTagUint16(image, tag) {
            let tagValue = image.data.uint16(tag);
            if (tagValue === undefined) {
                return '(VAZIO)';
            } else {
                return tagValue;
            }
        }
        
        //NORMAL
        document.getElementById('x00020000' + imgNum).textContent = readTagUint16(image, 'x00020000');
        document.getElementById('x00020001' + imgNum).textContent = readTagUint16(image, 'x00020001');
        document.getElementById('x00020002' + imgNum).textContent = readTagStringID(image, 'x00020002');
        document.getElementById('x00020003' + imgNum).textContent = readTagString(image, 'x00020003');
        document.getElementById('x00020010' + imgNum).textContent = readTagStringID(image, 'x00020010');
        document.getElementById('x00020012' + imgNum).textContent = readTagString(image, 'x00020012');
        document.getElementById('x00020013' + imgNum).textContent = readTagString(image, 'x00020013');
        document.getElementById('x00020016' + imgNum).textContent = readTagString(image, 'x00020016');
        document.getElementById('x00080005' + imgNum).textContent = readTagString(image, 'x00080005');
        document.getElementById('x00080008' + imgNum).textContent = readTagString(image, 'x00080008');
        document.getElementById('x00080016' + imgNum).textContent = readTagStringID(image, 'x00080016');
        document.getElementById('x00080018' + imgNum).textContent = readTagString(image, 'x00080018');
        document.getElementById('x00080020' + imgNum).textContent = readTagString(image, 'x00080020') + ' [' + formatData(readTagString(image, 'x00080020')) + ']';
        document.getElementById('x00080021' + imgNum).textContent = readTagString(image, 'x00080021') + ' [' + formatData(readTagString(image, 'x00080021')) + ']';
        document.getElementById('x00080022' + imgNum).textContent = readTagString(image, 'x00080022') + ' [' + formatData(readTagString(image, 'x00080022')) + ']';
        document.getElementById('x00080023' + imgNum).textContent = readTagString(image, 'x00080023') + ' [' + formatData(readTagString(image, 'x00080023')) + ']';
        document.getElementById('x00080030' + imgNum).textContent = readTagString(image, 'x00080030');
        document.getElementById('x00080031' + imgNum).textContent = readTagString(image, 'x00080031');
        document.getElementById('x00080032' + imgNum).textContent = readTagString(image, 'x00080032');
        document.getElementById('x00080033' + imgNum).textContent = readTagString(image, 'x00080033');
        document.getElementById('x00080050' + imgNum).textContent = readTagString(image, 'x00080050');
        document.getElementById('x00080060' + imgNum).textContent = readTagString(image, 'x00080060');
        document.getElementById('x00080070' + imgNum).textContent = readTagString(image, 'x00080070');
        document.getElementById('x00080080' + imgNum).textContent = readTagString(image, 'x00080080');
        document.getElementById('x00080081' + imgNum).textContent = readTagString(image, 'x00080081');
        document.getElementById('x00080090' + imgNum).textContent = readTagString(image, 'x00080090');
        document.getElementById('x00081010' + imgNum).textContent = readTagString(image, 'x00081010');
        document.getElementById('x00081030' + imgNum).textContent = readTagString(image, 'x00081030');
        document.getElementById('x0008103E' + imgNum).textContent = readTagString(image, 'x0008103E');
        document.getElementById('x00081070' + imgNum).textContent = readTagString(image, 'x00081070');
        document.getElementById('x00081090' + imgNum).textContent = readTagString(image, 'x00081090');
        //BLOCO (0008,1140)
        document.getElementById('x00081140' + imgNum).textContent = readTagStringID(image, 'x00081140');
        document.getElementById('x00081150' + imgNum).textContent = readTagStringID(image, 'x00081150');
        document.getElementById('x00081155' + imgNum).textContent = readTagStringID(image, 'x00081155');
        //NORMAL
        document.getElementById('x00082111' + imgNum).textContent = readTagString(image, 'x00082111');
        //BLOCO (0008,9215)
        document.getElementById('x00089215' + imgNum).textContent = readTagUint16(image, 'x00089215');
        document.getElementById('x00080100' + imgNum).textContent = readTagString(image, 'x00080100');
        document.getElementById('x00080102' + imgNum).textContent = readTagString(image, 'x00080102');
        document.getElementById('x00080104' + imgNum).textContent = readTagString(image, 'x00080104');
        //NORMAL
        document.getElementById('x00100010' + imgNum).textContent = readTagString(image, 'x00100010');
        document.getElementById('x00100020' + imgNum).textContent = readTagString(image, 'x00100020');
        document.getElementById('x00100030' + imgNum).textContent = readTagString(image, 'x00100030') + ' [' + formatData(readTagString(image, 'x00100030')) + ']';
        document.getElementById('x00100040' + imgNum).textContent = readTagString(image, 'x00100040');
        document.getElementById('x00101010' + imgNum).textContent = readTagString(image, 'x00101010');
        document.getElementById('x00180015' + imgNum).textContent = readTagString(image, 'x00180015');
        document.getElementById('x00180050' + imgNum).textContent = readTagString(image, 'x00180050');
        document.getElementById('x00180060' + imgNum).textContent = readTagString(image, 'x00180060');
        document.getElementById('x00181000' + imgNum).textContent = readTagString(image, 'x00181000');
        document.getElementById('x00181020' + imgNum).textContent = readTagString(image, 'x00181020');
        document.getElementById('x00181030' + imgNum).textContent = readTagString(image, 'x00181030');
        document.getElementById('x00181110' + imgNum).textContent = readTagString(image, 'x00181110');
        document.getElementById('x00181111' + imgNum).textContent = readTagString(image, 'x00181111');
        document.getElementById('x00181120' + imgNum).textContent = readTagString(image, 'x00181120');
        document.getElementById('x00181130' + imgNum).textContent = readTagString(image, 'x00181130');
        document.getElementById('x00181140' + imgNum).textContent = readTagString(image, 'x00181140');
        document.getElementById('x00181160' + imgNum).textContent = readTagString(image, 'x00181160');
        document.getElementById('x00181170' + imgNum).textContent = readTagString(image, 'x00181170');
        document.getElementById('x00181190' + imgNum).textContent = readTagString(image, 'x00181190');
        document.getElementById('x00181200' + imgNum).textContent = readTagString(image, 'x00181200') + ' [' + formatData(readTagString(image, 'x00181200')) + ']';
        document.getElementById('x00181201' + imgNum).textContent = readTagString(image, 'x00181201');
        document.getElementById('x00181210' + imgNum).textContent = readTagString(image, 'x00181210');
        document.getElementById('x00185100' + imgNum).textContent = readTagString(image, 'x00185100');
        document.getElementById('x0020000D' + imgNum).textContent = readTagString(image, 'x0020000D');
        document.getElementById('x0020000E' + imgNum).textContent = readTagString(image, 'x0020000E');
        document.getElementById('x00200010' + imgNum).textContent = readTagString(image, 'x00200010');
        document.getElementById('x00200011' + imgNum).textContent = readTagString(image, 'x00200011');
        document.getElementById('x00200012' + imgNum).textContent = readTagString(image, 'x00200012');
        document.getElementById('x00200013' + imgNum).textContent = readTagString(image, 'x00200013');
        document.getElementById('x00200032' + imgNum).textContent = readTagString(image, 'x00200032');
        document.getElementById('x00200037' + imgNum).textContent = readTagString(image, 'x00200037');
        document.getElementById('x00200052' + imgNum).textContent = readTagString(image, 'x00200052');
        document.getElementById('x00201040' + imgNum).textContent = readTagString(image, 'x00201040');
        document.getElementById('x00204000' + imgNum).textContent = readTagString(image, 'x00204000');
        document.getElementById('x00280002' + imgNum).textContent = readTagUint16(image, 'x00280002');
        document.getElementById('x00280004' + imgNum).textContent = readTagString(image, 'x00280004');
        document.getElementById('x00280006' + imgNum).textContent = readTagUint16(image, 'x00280006');
        document.getElementById('x00280008' + imgNum).textContent = readTagString(image, 'x00280008');
        document.getElementById('x00280010' + imgNum).textContent = readTagUint16(image, 'x00280010');
        document.getElementById('x00280011' + imgNum).textContent = readTagUint16(image, 'x00280011');
        document.getElementById('x00280030' + imgNum).textContent = readTagString(image, 'x00280030');
        document.getElementById('x00280100' + imgNum).textContent = readTagUint16(image, 'x00280100');
        document.getElementById('x00280101' + imgNum).textContent = readTagUint16(image, 'x00280101');
        document.getElementById('x00280102' + imgNum).textContent = readTagUint16(image, 'x00280102');
        document.getElementById('x00280103' + imgNum).textContent = readTagUint16(image, 'x00280103');
        document.getElementById('x00281050' + imgNum).textContent = readTagString(image, 'x00281050');
        document.getElementById('x00281051' + imgNum).textContent = readTagString(image, 'x00281051');
        document.getElementById('x00281052' + imgNum).textContent = readTagString(image, 'x00281052');
        document.getElementById('x00281053' + imgNum).textContent = readTagString(image, 'x00281053');
        document.getElementById('x00281054' + imgNum).textContent = readTagString(image, 'x00281054');
        document.getElementById('x00281055' + imgNum).textContent = readTagString(image, 'x00281055');
        document.getElementById('x00282110' + imgNum).textContent = readTagString(image, 'x00282110');
    }, function (err) {
        alert(err);
    });
}

const element1 = document.getElementById('dicomImage1');
cornerstone.enable(element1);

const element2 = document.getElementById('dicomImage2');
cornerstone.enable(element2);

function logArrayElements(element, index, array) {
    var valueImg1 = document.getElementById(element + '1').textContent;
    var valueImg2 = document.getElementById(element + '2').textContent;

    if (valueImg1 !== valueImg2) {
        let elem = document.getElementById(element);
        elem.style.backgroundColor = '#ff4343';
    }
}

function readTagsAndCompare() {
    $('#dataTable').DataTable().columns.adjust();

    var arrayTags = ['x00020000', 'x00020001', 'x00020002', 'x00020003', 'x00020010',
        'x00020012', 'x00020013', 'x00020016', 'x00080005', 'x00080008', 'x00080016', 'x00080018', 'x00080020', 'x00080021', 'x00080022', 'x00080023', 'x00080030', 'x00080031',
        'x00080032', 'x00080033', 'x00080050', 'x00080060', 'x00080070', 'x00080080', 'x00080081', 'x00080090', 'x00081010', 'x00081030', 'x0008103E', 'x00081070', 'x00081090',
        'x00081140', 'x00081150', 'x00081155', 'x00082111', 'x00089215', 'x00080100', 'x00080102', 'x00080104', 'x00100010', 'x00100020', 'x00100030', 'x00100040', 'x00101010',
        'x00180015', 'x00180050', 'x00180060', 'x00181000', 'x00181020', 'x00181030', 'x00181110', 'x00181111', 'x00181120', 'x00181130', 'x00181140', 'x00181160', 'x00181170',
        'x00181190', 'x00181200', 'x00181201', 'x00181210', 'x00185100', 'x0020000D', 'x0020000E', 'x00200010', 'x00200011', 'x00200012', 'x00200013', 'x00200032', 'x00200037',
        'x00200052', 'x00201040', 'x00204000', 'x00280002', 'x00280004', 'x00280006', 'x00280008', 'x00280010', 'x00280011', 'x00280030', 'x00280100', 'x00280101', 'x00280102',
        'x00280103', 'x00281050', 'x00281051', 'x00281052', 'x00281053', 'x00281054', 'x00281055', 'x00282110'];

    arrayTags.forEach(logArrayElements);
}

//Select File 1
document.getElementById('selectFile1').addEventListener('change', function (e) {
    const file1 = e.target.files[0];
    const imageId1 = cornerstoneWADOImageLoader.wadouri.fileManager.add(file1);
    loadAndViewImage(imageId1, true);

    var fileName1 = document.getElementById("selectFile1").files[0].name;
    document.getElementById("dicomName1").innerHTML = fileName1;

    if (document.getElementById('selectFile2').value !== '') {
        setTimeout(function () { readTagsAndCompare() }, 500);
    }
});

//Select File 2
document.getElementById('selectFile2').addEventListener('change', function (e) {
    const file2 = e.target.files[0];
    const imageId2 = cornerstoneWADOImageLoader.wadouri.fileManager.add(file2);
    loadAndViewImage(imageId2, false);

    var fileName2 = document.getElementById("selectFile2").files[0].name;
    document.getElementById("dicomName2").innerHTML = fileName2;

    if (document.getElementById('selectFile1').value !== '') {
        setTimeout(function () { readTagsAndCompare() }, 500);
    }
});

$('tbody tr').on('click', function (e) {
    let tempTagNumber = $(this).attr('id');

    $('#exampleModalCenter').modal("show");
    $('#exampleModalLongTitle').text($('#' + tempTagNumber + ' td')[0].innerHTML)
    $('.modal-body').text(tagText[tempTagNumber]);
});