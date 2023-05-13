// Notification
import toastr from "toastr";
import "toastr/build/toastr.min.css";
function showToast({
    toastType="success",
    title="",
    message
  }) {
    var toastType;
    //Close Button
    var closeButton = true;
    //Add behavior on toast click Button
    var behaviorButton = false;
    //Debug
    var debug = false;
    //Progressbar
    var progressBar = true;
    //Duplicates
    var preventDuplicates = false;
    //Newest on Top
    var newestOnTop = true;
    //position class
    var positionClass = "toast-top-right";
    //Show Easing
    var showEasing = 'swing';
    //Hide Easing
    var hideEasing = 'linear';
    //show method
    var showMethod = 'fadeIn';
    //Hide method
    var hideMethod = 'fadeOut';
    //show duration
    var showDuration = 300;
    //Hide duration
    var hideDuration = 500;
    //timeout
    var timeOut = 5000;
    //extended timeout
    var extendedTimeOut = 1000;
    toastr.options = {
      positionClass: positionClass,
      timeOut: timeOut,
      extendedTimeOut: extendedTimeOut,
      closeButton: closeButton,
      behaviorButton: behaviorButton,
      debug: debug,
      progressBar: progressBar,
      preventDuplicates: preventDuplicates,
      newestOnTop: newestOnTop,
      showEasing: showEasing,
      hideEasing: hideEasing,
      showMethod: showMethod,
      hideMethod: hideMethod,
      showDuration: showDuration,
      hideDuration: hideDuration,
    };
    // setTimeout(() => toastr.success(`Settings updated `), 300)
    //Toaster Types
    if (toastType === "info") return toastr.info(message, title);
    else if (toastType === "warning") return toastr.warning(message, title);
    else if (toastType === "error") return toastr.error(message, title);
    else return toastr.success(message, title);
}

export {
    showToast
}
