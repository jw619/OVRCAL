document.addEventListener('DOMContentLoaded', function() {
    createInputFields();
});

function createInputFields() {
    const tbody = document.getElementById('players-table').querySelector('tbody');
    for (let i = 1; i <= 11; i++) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>선수 ${i}</td>
            <td><input type="number" class="evolution" min="0"></td>
            <td><input type="number" class="enhancement" min="0"></td>
            <td><input type="number" class="skill-boost" min="0"></td>
            <td><input type="number" class="base-overall" min="0"></td>
            <td><input type="number" class="awakening" min="0"></td>
        `;
        tbody.appendChild(tr);
    }
}

function calculateTeamOverall() {
    const evolutions = Array.from(document.querySelectorAll('.evolution')).map(input => parseFloat(input.value) || 0);
    const enhancements = Array.from(document.querySelectorAll('.enhancement')).map(input => parseFloat(input.value) || 0);
    const skillBoosts = Array.from(document.querySelectorAll('.skill-boost')).map(input => parseFloat(input.value) || 0);
    const baseOveralls = Array.from(document.querySelectorAll('.base-overall')).map(input => parseFloat(input.value) || 0);
    const awakenings = Array.from(document.querySelectorAll('.awakening')).map(input => parseFloat(input.value) || 0);

    const teamOverall = calculateOverall(evolutions, enhancements, skillBoosts, baseOveralls, awakenings);
    document.getElementById('result').textContent = `오버롤: ${teamOverall}`;
}

function calculateOverall(evolutionLevels, enhancementLevels, skillBoostLevels, baseOveralls, awakeningLevels) {
    const totalEvolution = sum(evolutionLevels);
    const totalEnhancement = sum(enhancementLevels);
    const totalSkillBoost = sum(skillBoostLevels);
    const totalBaseOverall = sum(baseOveralls);
    const totalAwakening = sum(awakeningLevels);

    return Math.round(
        (totalEvolution + totalEnhancement + totalSkillBoost + totalBaseOverall + totalAwakening) / evolutionLevels.length
    );
}

function sum(arr) {
    return arr.reduce((acc, curr) => acc + curr, 0);
}
