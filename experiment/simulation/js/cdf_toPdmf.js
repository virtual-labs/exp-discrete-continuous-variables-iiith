// fixing the continuous RV to be uniform and discrete RV to have only 5 points with non-zero probability
var uniformRV_pdf_prams = [3, 8];
var discreteRV_pmf_vals = [0.1,0.2,0.25,0.25,0.2];
var RV_type = "none";
// on dom load
document.addEventListener("DOMContentLoaded", function () {
    reset();
});

function generateCDF() {
    var randomNumber = Math.random();
    document.getElementById("generate-cdf-button").style.display = "none";
    if (randomNumber < 0.5) {
        RV_type = "uniform";
        document.getElementById("cdf-img-elem").src = "./images/cdfuniform.png";
    }
    else {
        RV_type = "discrete";
        document.getElementById("cdf-img-elem").src = "./images/discrete_cdf.png";
    }
    document.getElementById("cdf-img-elem").style.display = "block";
    document.getElementById("select-rv-type").style.display = "block";
}

function rvType() {
    var value = document.getElementById("rv-type").value;
    if (value == 'discrete') {
        document.getElementById("pmf-resp").style.display = "block";
        document.getElementById("pdf-resp").style.display = "none";
    }else if(value == 'continuous'){
        document.getElementById("pdf-resp").style.display = "block";
        document.getElementById("pmf-resp").style.display = "none";
    }else{
        document.getElementById("pdf-resp").style.display = "none";
        document.getElementById("pmf-resp").style.display = "none";
    }
}

function pdf()
{
    if(RV_type == "uniform")
    {
        var pdfVal = document.getElementById("pdf-val").value;
        var pdfleft = document.getElementById("pdf-left").value;
        var pdfright = document.getElementById("pdf-right").value;
        if(pdfleft == uniformRV_pdf_prams[0] && pdfright == uniformRV_pdf_prams[1] && pdfVal == 1/(uniformRV_pdf_prams[1]-uniformRV_pdf_prams[0]))
        {
            document.getElementById("observations1").innerText = "Correct!";
        }else{
            document.getElementById("observations1").innerText = "Incorrect!";
        }
    }
    else if(RV_type == "discrete")
    {
        document.getElementById("observations1").innerText = "This is a discrete random variable. it has a pmf not a pdf.";
    }

}

function pmf()
{
    if(RV_type == "discrete")
    {
        var pmf_p1 = document.getElementById("pmf-p1").value;
        var pmf_p2 = document.getElementById("pmf-p2").value;
        var pmf_p3 = document.getElementById("pmf-p3").value;
        var pmf_p4 = document.getElementById("pmf-p4").value;
        var pmf_p5 = document.getElementById("pmf-p5").value;
        if(pmf_p1 == discreteRV_pmf_vals[0] && pmf_p2 == discreteRV_pmf_vals[1] && pmf_p3 == discreteRV_pmf_vals[2] && pmf_p4 == discreteRV_pmf_vals[3] && pmf_p5 == discreteRV_pmf_vals[4])
        {
            document.getElementById("observations1").innerText = "Correct!";
        }
        else{
            document.getElementById("observations1").innerText = "Incorrect!";
        }
    }
    else if(RV_type == "uniform")
    {
        document.getElementById("observations1").innerText = "This is a continuous random variable. it has a pdf not a pmf.";
    }
}

function reset() {
    RV_type = "none";
    document.getElementById("generate-cdf-button").style.display = "block";
    document.getElementById("cdf-img-elem").style.display = "none";
    document.getElementById("select-rv-type").style.display = "none";
    document.getElementById("pdf-resp").style.display = "none";
    document.getElementById("pmf-resp").style.display = "none";
    document.getElementById("observations1").innerText = "";
    document.getElementById("pdf-val").value = "";
    document.getElementById("pdf-left").value = "";
    document.getElementById("pdf-right").value = "";
    document.getElementById("pmf-p1").value = "";
    document.getElementById("pmf-p2").value = "";
    document.getElementById("pmf-p3").value = "";
    document.getElementById("pmf-p4").value = "";
    document.getElementById("pmf-p5").value = "";
    document.getElementById("rv-type").value = "none";
}
