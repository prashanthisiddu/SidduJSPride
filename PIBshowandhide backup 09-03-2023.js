function PIBshowandhide(primaryControl) {
    debugger;
    try {
      formcontext = primaryControl;
      var currentstatus = formcontext.getAttribute("pg_currentstatus").getValue();
      var performance = formcontext.getAttribute("pg_performanceperiod").getValue();
      var Q1 = performance.split('-');
      var Quater = Q1[0];
      var yearsomex = Q1[1];
      var Qua1 = "31-mar";
      var dt1 = Qua1.split('-');
      var day1 = dt1[0];
      var month1 = dt1[1].toLocaleLowerCase();
      var year1 = yearsomex;
      var QuaterQ1 = year1 + "-" + month1 + "-" + day1;
      enddateforQ1 = new Date(QuaterQ1.replace(/-/g, "/"));
  
      var enddateforQ2 = new Date();
      var Qua2 = "30-june";
      var dt2 = Qua2.split('-');
      var day2 = dt2[0];
      var month2 = dt2[1].toLocaleLowerCase();
      var year2 = yearsomex;
      var QuaterQ2 = year2 + "-" + month2 + "-" + day2;
      enddateforQ2 = new Date(QuaterQ2.replace(/-/g, "/"));
      var enddateforQ3 = new Date();
      var Qua3 = "30-sep";
      var dt3 = Qua3.split('-');
      var day3 = dt3[0];
      var month3 = dt3[1].toLocaleLowerCase();
      var year3 = yearsomex;
      var QuaterQ3 = year3 + "-" + month3 + "-" + day3;
      enddateforQ3 = new Date(QuaterQ3.replace(/-/g, "/"));
      var enddateforQ4 = new Date();
      var Qua4 = "31-dec";
      var dt4 = Qua4.split('-');
      var day4 = dt4[0];
      var month4 = dt4[1].toLocaleLowerCase();
      var year4 = yearsomex;
      var QuaterQ4 = year4 + "-" + month4 + "-" + day4;
      enddateforQ4 = new Date(QuaterQ4.replace(/-/g, "/"));
  
      var quaterenddate = {};
      if (Quater === "Q4") {
        var quaterenddate = enddateforQ4;
      }
      else if (Quater === "Q3") {
        var quaterenddate = enddateforQ3;
      }
      else if (Quater === "Q2") {
        quaterenddate = enddateforQ2;
      }
      else if (Quater === "Q1") {
        quaterenddate = enddateforQ1;
      }
      var workerreviewid = formcontext.getAttribute("pg_workerreviewid").getValue()[0].id;
  
      Xrm.WebApi.online.retrieveRecord("cdm_worker", workerreviewid, "?$select=cdm_anniversarydatetime").then(
        function success(result) {
          var cdm_anniversarydatetime = result["cdm_anniversarydatetime"];
          var anivarsary = new Date(cdm_anniversarydatetime);
          if (quaterenddate > anivarsary && currentstatus === 140310004) {
            return true;
          }
          else if(quaterenddate < anivarsary && currentstatus != 140310004){
            return false;
          }
          else {
            return false;
          }
  
                
                 
                },
        function (error) {
          console.log(error.message);
        }
      );
    }
  
    catch (err) {
    }
  
  }