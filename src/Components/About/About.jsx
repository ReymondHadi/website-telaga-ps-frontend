import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="about-story">
        <div className="container">
          <div className="story-content">
            <h2>Cerita Kami</h2>
            <p>
              Toko kami didirikan pada tahun 2018 dengan misi menyediakan produk berkualitas tinggi 
              dengan harga terjangkau bagi masyarakat Indonesia. Bermula dari sebuah toko kecil di Bogor, 
              kami telah berkembang menjadi e-commerce terpercaya yang melayani ribuan pelanggan di seluruh Indonesia.
            </p>
            <p>
              Kami percaya bahwa belanja online seharusnya menyenangkan, mudah, dan aman. 
              Itulah mengapa kami terus berinovasi untuk memberikan pengalaman berbelanja terbaik 
              kepada pelanggan kami.
            </p>
          </div>
          <div className="story-image">
            <div className="years-experience">
              <span>1+</span>
              <p>Tahun Pengalaman</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mission-vision">
        <div className="container">
          <div className="mission">
            <div className="icon-box">
              {/* <img src={missionIcon} alt="Mission" /> */}
            </div>
            <h3>Misi Kami</h3>
            <p>
              Menyediakan produk berkualitas tinggi dengan harga terjangkau, 
              memberikan pengalaman berbelanja online yang menyenangkan dan aman, 
              serta memberikan pelayanan pelanggan terbaik.
            </p>
          </div>
          
          <div className="vision">
            <div className="icon-box">
              {/* <img src={visionIcon} alt="Vision" /> */}
            </div>
            <h3>Visi Kami</h3>
            <p>
              Menjadi e-commerce pilihan utama masyarakat Indonesia yang dikenal 
              karena kualitas produk, pelayanan pelanggan, dan inovasi teknologi.
            </p>
          </div>
          
          <div className="values">
            <div className="icon-box">
              {/* <img src={valuesIcon} alt="Values" /> */}
            </div>
            <h3>Nilai Kami</h3>
            <ul>
              <li>Integritas dalam setiap transaksi</li>
              <li>Inovasi terus-menerus</li>
              <li>Kepuasan pelanggan di atas segalanya</li>
              <li>Komitmen pada kualitas produk</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="our-team">
        <div className="container">
          <h2>Tim Kami</h2>
          <p>Orang-orang hebat di balik kesuksesan toko kami</p>
          
          <div className="team-members">
            <div className="team-card">
              {/* <div className="member-photo" style={{ backgroundImage: `url(${teamImage})` }}></div> */}
              <h3>Maryanto Hadi</h3>
              <p>Owner</p>
            </div>
            
            <div className="team-card">
              {/* <div className="member-photo" style={{ backgroundImage: `url(${teamImage})` }}></div> */}
              <h3>Yurita Natalia Hadi</h3>
              <p>Head of Operations</p>
            </div>
            
            <div className="team-card">
              {/* <div className="member-photo" style={{ backgroundImage: `url(${teamImage})` }}></div> */}
              <h3>Hendra Bun</h3>
              <p>Marketing Director</p>
            </div>
            
            <div className="team-card">
              {/* <div className="member-photo" style={{ backgroundImage: `url(${teamImage})` }}></div> */}
              <h3>Sandy Febrian Hadi</h3>
              <p>Customer Service Manager</p>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="container">
          <div className="stat-item">
            <h3>5000+</h3>
            <p>Pelanggan Puas</p>
          </div>
          <div className="stat-item">
            <h3>100+</h3>
            <p>Produk Berkualitas</p>
          </div>
          <div className="stat-item">
            <h3>98%</h3>
            <p>Rating Positif</p>
          </div>
          <div className="stat-item">
            <h3>24/7</h3>
            <p>Dukungan Pelanggan</p>
          </div>
        </div>
      </div>

      <div className="contact-about">
        <div className="container">
          <h2>Hubungi Kami</h2>
          <p>Punya pertanyaan atau masukan? Kami siap membantu</p>
          
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h4>Alamat</h4>
                <p>Jl. Pahlawan, Leuwinutug, Kec. Citeureup, Kabupaten Bogor, Jawa Barat 16810</p>
              </div>
            </div>
            
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h4>Telepon</h4>
                <p>085267035235</p>
              </div>
            </div>
            
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h4>Email</h4>
                <p>ramdhanhadi108@gmail.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <i className="fas fa-clock"></i>
              <div>
                <h4>Jam Operasional</h4>
                <p>Senin - Sabtu: 08:00 - 17:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;