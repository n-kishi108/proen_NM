function RMC_Common ()
{
}

RMC_Common.prototype = {
    buttonToggle : function (btnObj)
    {
        btnObj.disabled = btnObj.disabled == true ? false : true;
    }
}

rmc_common = new RMC_Common();
