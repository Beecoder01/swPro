navigate();
var tControl = true;
var mData;

function navigate() {
    let loc = location.hash;
    if (!loc) {
        loc = "#Home";
    }
    let content = document.getElementById('app');
    // removing #
    let id = loc.substr(1);

    // check link if docs:
    if (id.includes("Docs")) {
        content.innerHTML = mDocs[id];
    } else {
        content.innerHTML = dataCompoment[id];
        popAssets(id);
        closeNav();
    }
    document.documentElement.scrollTop  =  0;
}

// custom pop assets:
function popAssets(id) {
    if (id == "Home") {
        document.getElementById('hide').style.display = "none";
        // activating carousel
        $('.owl-carousel').owlCarousel({
            loop: false,
            margin: 10,
            nav: true,
            dots: false,
            responsive: {
                0: {
                    items: 2
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 4
                }
            }
        });
    } else if (id == "Codes") {
        // fetch data for codes:

        // fetch("./d.txt")
        // fetch("https://sketch-java.firebaseio.com/java_code.json")
        // fetch("https://myfirebase1-36d69-default-rtdb.firebaseio.com/swCodes/c1.json")
        fetch("https://beecoder01.github.io/swPro/codes.json")
            .then(response => response.json())
            .then(data => showData(data))
            .catch(err => console.log("err" + err));
    }
}

// defing show data: To DISPLAY Codes:
function showData(data) {
    // let k = JSON.parse(data);
    k = data;
    mData = k;
    let s = "";
    var tBody = document.getElementById('populate');
    for (const i in k) {
        s = s + `<tr><td>${k[i].name}</td><td onclick="display(${i})"><u>View</u></td></tr>`;
    }
    // populate;
    tBody.innerHTML = `<tr class="header">
                        <th style="width: 70%;">Code</th>
                        <th style="width: 30%;">View</th>
                        </tr>` + s;

}

// show prompt: Show Modal On Click Code Item:
function display(id) {
    document.getElementById("cText").value = mData[id].code;
    document.getElementById('myModalBody').innerText = mData[id].code;
    var myModal = new bootstrap.Modal(document.getElementById('myModal'));
    myModal.show();
}

// function to sort data from codes table:
function myFunction() {
    if (tControl) {
        tControl = false;
        setTimeout(() => {
            console.log("entered");
            // Declare variables
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("myTable");
            tr = table.getElementsByTagName("tr");

            // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[0];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
            tControl = true;
        }, 500);
    }

}


function closeNav() {
    document.getElementsByClassName('collapse')[0].classList.remove('show');
    document.getElementsByClassName('navbar-dropdown')[0].classList.remove('opened');
}

function clickCopy() {
    /* Get the text field */
    var copyText = document.getElementById("cText");
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
    /* Alert the copied text */
    alert("Copied to ClipBoard");
}

window.addEventListener('hashchange', navigate);
