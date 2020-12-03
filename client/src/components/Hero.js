export default function Hero() {
  return (
    <section
      id="carouselExampleControls"
      className="carousel slide hero-container"
      data-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://lh3.googleusercontent.com/proxy/EFbz0IAnGU-57WQLCOOCBlbIcvmQ529OgoWl0p8FxpYoOY91jH2YXiTimBN7GlMjaBPIuFltBdEAScTMLr0HpwQ4X-sCMl2-shf8gxO0mJ4oMXqb2l4TiMkKFzu76jEtIF4ewPpgasDjTjP-pPJiwCo5Q2w"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://images.medicinenet.com/images/article/main_image/puberty-in-girls.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://lh3.googleusercontent.com/proxy/EFbz0IAnGU-57WQLCOOCBlbIcvmQ529OgoWl0p8FxpYoOY91jH2YXiTimBN7GlMjaBPIuFltBdEAScTMLr0HpwQ4X-sCMl2-shf8gxO0mJ4oMXqb2l4TiMkKFzu76jEtIF4ewPpgasDjTjP-pPJiwCo5Q2w"
            class="d-block w-100 carousel-img"
            alt="..."
          />
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
      <button className="hero-container__button">Support Now</button>
    </section>
  );
}
