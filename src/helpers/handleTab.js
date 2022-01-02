const handleTab = e => {
    if (e.key === "Tab") {
        e.preventDefault();
        var start = e.target.selectionStart;
        var end = e.target.selectionEnd;
        e.target.value = e.target.value.substring(0, start) +"\t" + e.target.value.substring(end);
        e.target.selectionStart = e.target.selectionEnd = start + 1;
    }
    return e.target.value
}

export default handleTab