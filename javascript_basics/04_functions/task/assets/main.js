function showError(error, title) {
    BootstrapDialog.alert({
        type: BootstrapDialog.TYPE_DANGER,
        title: title || "ERROR!",
        message: error
    });
}

var verify = (function () {
    function expect(result) {
        return {
            toEqual: function (target) {
                if (JSON.stringify(result) === JSON.stringify(target)) {
                    BootstrapDialog.alert({
                        type: BootstrapDialog.TYPE_SUCCESS,
                        title: "Success",
                        message: "Well done!"
                    });
                } else {
                    showError(
                        `Got result: <strong>${JSON.stringify(result)}</strong><br />
                        expected: <strong>${JSON.stringify(target)}</strong>`,
                        "Wrong result"
                    );
                }
            }
        };
    }

    return function (result, solution) {
        expect(result).toEqual(solution);
    };
})();

$(function () {
    var hashMatch = location.hash.match(/#(.*)/i);
    var exerciseId = hashMatch && hashMatch[1] && hashMatch[1] !== "" ?
        hashMatch[1] : "1";

    var codeTextArea = document.querySelector('textarea.code');

    var title = $(`#exercise-${exerciseId}-title`).html();
    var code = $(`#exercise-${exerciseId}-code`).html();
    var solution = $(`#exercise-${exerciseId}-solution`).html();
    var solutionCode = $(`#exercise-${exerciseId}-solution-code`).html();

    if (!code || !title || !solution) {
        showError("Exercise does not exist");
        return;
    }
    renderTitleAndCode(exerciseId, title, codeTextArea, code);

    var codeMirror = CodeMirror.fromTextArea( document.querySelector('.code'), {
        lineNumbers: true
    });

    $(".solution-code").html(solutionCode).hide();

    $('.show-solution').click(function() {
        $(".solution-code").toggle();
    });

    $(".go").on("click", function () {
        codeMirror.save();

        try {
            var result = eval($(codeTextArea).val());

            verify(result, JSON.parse(solution));
        } catch (e) {
            showError(e.message);
        }
    });

    function renderTitleAndCode(exerciseId, title, codeTextArea, code) {
        $(".title-text").html(`${exerciseId}: ${title}`);
        codeTextArea.innerHTML = code;
    }
});