document.getElementById("calculadora").addEventListener("submit", function (e) {
  e.preventDefault();

  // Capturar valores del formulario
  const mu = parseFloat(document.getElementById("media").value);
  const xBar = parseFloat(document.getElementById("mediaMuestra").value);
  const sigma = parseFloat(document.getElementById("desviacion").value);
  const n = parseFloat(document.getElementById("n").value);
  const alpha = parseFloat(document.getElementById("significancia").value);
  const tipoPrueba = document.getElementById("tipoPrueba").value;

  // Calcular Z
  const z = (xBar - mu) / (sigma / Math.sqrt(n));
  const zRedondeado = z.toFixed(2);

  // Determinar región de rechazo
  let rechazaHo = false;
  let conclusion = "";

  if (tipoPrueba === "bilateral") {
    const zCritico = parseFloat((1.96).toFixed(2)); // para α = 0.05
    rechazaHo = z < -zCritico || z > zCritico;
    conclusion = rechazaHo
      ? `Z = ${zRedondeado} cae en la región de rechazo. Se rechaza H₀.`
      : `Z = ${zRedondeado} no cae en la región de rechazo. No se rechaza H₀.`;
  } else if (tipoPrueba === "unilateral-izquierda") {
    const zCritico = parseFloat((-1.645).toFixed(2)); // para α = 0.05
    rechazaHo = z < zCritico;
    conclusion = rechazaHo
      ? `Z = ${zRedondeado} es menor que ${zCritico}. Se rechaza H₀.`
      : `Z = ${zRedondeado} no es menor que ${zCritico}. No se rechaza H₀.`;
  } else if (tipoPrueba === "unilateral-derecha") {
    const zCritico = parseFloat((1.645).toFixed(2)); // para α = 0.05
    rechazaHo = z > zCritico;
    conclusion = rechazaHo
      ? `Z = ${zRedondeado} es mayor que ${zCritico}. Se rechaza H₀.`
      : `Z = ${zRedondeado} no es mayor que ${zCritico}. No se rechaza H₀.`;
  }

  // Mostrar resultado
  const resultado = `
    <p><strong>Estadístico Z:</strong> ${zRedondeado}</p>
    <p><strong>Conclusión:</strong> ${conclusion}</p>
    <p><strong>Interpretación:</strong> Con un nivel de significancia de ${alpha}, ${
    rechazaHo
      ? "hay evidencia suficiente para rechazar la hipótesis nula."
      : "no hay evidencia suficiente para rechazar la hipótesis nula."
  }</p>
  `;

  document.getElementById("resultado").innerHTML = resultado;
});
