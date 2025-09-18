// const backendUrl = "http://127.0.0.1:5000";

// document.getElementById('generateBtn').addEventListener('click', async () => {
//     const topic = document.getElementById('topic').value.trim();
//     const output = document.getElementById('paper-output');
//     const loading = document.getElementById('loading');
//     const downloadBtn = document.getElementById('downloadBtn');
//     const resetBtn = document.getElementById('resetBtn');

//     if (!topic) {
//         alert('Please enter a topic');
//         return;
//     }

//     output.innerHTML = '';
//     loading.style.display = 'block';
//     downloadBtn.disabled = true;
//     resetBtn.disabled = true;

//     try {
//         const res = await fetch(`${backendUrl}/generate`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ topic })
//         });

//         const data = await res.json();
//         loading.style.display = 'none';

//         if (data.paper) {
//             output.innerHTML = data.paper.replace(/\n/g, "<br>");
//             downloadBtn.disabled = false;
//             resetBtn.disabled = false;
//         } else {
//             output.innerHTML = "Error generating paper: " + (data.error || "Unknown error");
//         }
//     } catch (err) {
//         loading.style.display = 'none';
//         output.innerHTML = "Error: " + err.message;
//     }
// });

// document.getElementById('downloadBtn').addEventListener('click', () => {
//     const content = document.getElementById('paper-output').innerText;
//     const blob = new Blob([content], { type: 'text/plain' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'research_paper.txt';
//     link.click();
// });

// document.getElementById('resetBtn').addEventListener('click', () => {
//     document.getElementById('topic').value = '';
//     document.getElementById('paper-output').innerHTML = '';
//     document.getElementById('downloadBtn').disabled = true;
//     document.getElementById('resetBtn').disabled = true;
// });


const backendUrl = "http://127.0.0.1:5000";

document.getElementById('generateBtn').addEventListener('click', async () => {
    const topic = document.getElementById('topic').value.trim();
    const focus_area = document.getElementById('focus').value.trim();
    const paper_type = document.getElementById('paperType').value;
    const output = document.getElementById('paper-output');
    const loading = document.getElementById('loading');
    const downloadBtn = document.getElementById('downloadBtn');
    const resetBtn = document.getElementById('resetBtn');

    if (!topic) {
        alert('Please enter a topic');
        return;
    }

    output.innerHTML = '';
    loading.style.display = 'block';
    downloadBtn.disabled = true;
    resetBtn.disabled = true;

    try {
        const res = await fetch(`${backendUrl}/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic, focus_area, paper_type })
        });

        const data = await res.json();
        loading.style.display = 'none';

        if (data.paper) {
            output.innerHTML = data.paper.replace(/\n/g, "<br>");
            downloadBtn.disabled = false;
            resetBtn.disabled = false;
        } else {
            output.innerHTML = "Error generating paper: " + (data.error || "Unknown error");
        }
    } catch (err) {
        loading.style.display = 'none';
        output.innerHTML = "Error: " + err.message;
    }
});

document.getElementById('downloadBtn').addEventListener('click', () => {
    const content = document.getElementById('paper-output').innerText;
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'research_paper.txt';
    link.click();
});

document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('topic').value = '';
    document.getElementById('focus').value = '';
    document.getElementById('paper-output').innerHTML = 'Enter a topic to generate your research paper';
    document.getElementById('downloadBtn').disabled = true;
    document.getElementById('resetBtn').disabled = true;
});
