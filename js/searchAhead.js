var locationsList = [
    {
        url: "https://maps.google.com/?q=1868+Warrensville+Center+Rd,+South+Euclid,+OH+44121",
        label: "1868 Warrensville Center Rd, South Euclid, OH 44121"
    },
    {
        url: "https://maps.google.com/?q=6594+Mayfield+Rd,+Mayfield+Heights,+OH+44124",
        label: "6594 Mayfield Rd, Mayfield Heights, OH 44124"
    },
    {
        url: "https://maps.google.com/?q=7235+Market+Pl+Dr,+Aurora,+OH+44202",
        label: "7235 Market Pl Dr, Aurora, OH 44202"
    },
    {
        url: "https://maps.google.com/?q=3400+Steelyard+Dr,+Cleveland,+OH+44109",
        label: "3400 Steelyard Dr, Cleveland, OH 44109"
    }
]
$(document).ready(function () {  
    $('.carousel').carousel({
        interval: 2000
    })
    
    $("#navSearch").autocomplete({
        source: locationsList,
        select: function (event, ui) {
            window.open(
                ui.item.url,
                '_blank'
            );
        }
    });
});