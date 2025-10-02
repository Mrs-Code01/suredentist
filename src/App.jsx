import React, { useState, useEffect } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  });

  const [bookings, setBookings] = useState([]);
  const [view, setView] = useState('booking');
  const [filterStatus, setFilterStatus] = useState('all');

  const services = [
    { name: 'General Checkup', price: '₦15,000', duration: '30 mins' },
    { name: 'Teeth Cleaning', price: '₦20,000', duration: '45 mins' },
    { name: 'Teeth Whitening', price: '₦50,000', duration: '1 hour' },
    { name: 'Filling', price: '₦25,000', duration: '45 mins' },
    { name: 'Root Canal', price: '₦80,000', duration: '1.5 hours' },
    { name: 'Extraction', price: '₦30,000', duration: '30 mins' },
    { name: 'Braces Consultation', price: '₦100,000', duration: '1 hour' },
    { name: 'Emergency Visit', price: '₦20,000', duration: '30 mins' }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const statusStyles = {
    Pending: { color: '#FFA500', bg: 'rgba(255, 165, 0, 0.2)' },
    Confirmed: { color: '#2196F3', bg: 'rgba(33, 150, 243, 0.2)' },
    Completed: { color: '#4CAF50', bg: 'rgba(76, 175, 80, 0.2)' },
    Cancelled: { color: '#F44336', bg: 'rgba(244, 67, 54, 0.2)' },
    'No-Show': { color: '#9E9E9E', bg: 'rgba(158, 158, 158, 0.2)' }
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #e2e8f0; background: #0f172a; }
      .container { min-height: 100vh; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); }
      .header { background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(148, 163, 184, 0.1); position: sticky; top: 0; z-index: 100; }
      .header-content { max-width: 1200px; margin: 0 auto; padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
      .logo-section { display: flex; align-items: center; gap: 1rem; }
      .logo-icon { font-size: 3rem; filter: drop-shadow(0 0 20px rgba(96, 165, 250, 0.5)); }
      .clinic-name { font-size: 1.8rem; background: linear-gradient(135deg, #60a5fa, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 700; }
      .clinic-tagline { font-size: 0.9rem; color: #94a3b8; }
      .toggle-btn { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 12px; cursor: pointer; font-size: 0.95rem; font-weight: 700; box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3); transition: all 0.3s; }
      .toggle-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 30px rgba(59, 130, 246, 0.5); }
      .hero { text-align: center; padding: 5rem 2rem 3rem; background: radial-gradient(ellipse at top, rgba(59, 130, 246, 0.15), transparent); }
      .hero-title { font-size: 3.5rem; margin-bottom: 1rem; font-weight: 900; background: linear-gradient(135deg, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .hero-subtitle { font-size: 1.3rem; color: #94a3b8; }
      .services-section { max-width: 1400px; margin: 0 auto; padding: 4rem 2rem; }
      .section-title { text-align: center; font-size: 2.5rem; font-weight: 800; margin-bottom: 3rem; background: linear-gradient(135deg, #60a5fa, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
      .service-card { background: rgba(30, 41, 59, 0.5); backdrop-filter: blur(10px); border: 1px solid rgba(148, 163, 184, 0.1); padding: 2rem; border-radius: 20px; text-align: center; transition: all 0.3s; cursor: pointer; }
      .service-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(96, 165, 250, 0.2); border-color: rgba(96, 165, 250, 0.5); }
      .service-name { font-size: 1.3rem; color: #e2e8f0; margin-bottom: 0.5rem; font-weight: 700; }
      .service-price { font-size: 1.8rem; color: #60a5fa; font-weight: 800; margin-bottom: 0.5rem; }
      .service-duration { color: #94a3b8; font-size: 0.9rem; }
      .form-section { max-width: 900px; margin: 0 auto; padding: 4rem 2rem; }
      .form-container { background: rgba(30, 41, 59, 0.5); backdrop-filter: blur(10px); border: 1px solid rgba(148, 163, 184, 0.1); border-radius: 24px; padding: 3rem; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); }
      .form-title { font-size: 2.2rem; font-weight: 800; margin-bottom: 2.5rem; text-align: center; background: linear-gradient(135deg, #60a5fa, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.8rem; }
      .form-group { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.8rem; }
      .form-label { font-weight: 700; color: #e2e8f0; font-size: 0.95rem; }
      .form-input, .form-select, .form-textarea { padding: 1rem; background: rgba(15, 23, 42, 0.8); border: 2px solid rgba(148, 163, 184, 0.2); border-radius: 12px; font-size: 1rem; color: #fff; font-family: inherit; transition: all 0.3s; }
      .form-input:focus, .form-select:focus, .form-textarea:focus { outline: none; border-color: #60a5fa; box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2); }
      .form-textarea { resize: vertical; min-height: 100px; }
      .submit-btn { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; border: none; padding: 1.3rem; border-radius: 12px; font-size: 1.2rem; font-weight: 800; cursor: pointer; width: 100%; box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4); transition: all 0.3s; }
      .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 15px 40px rgba(59, 130, 246, 0.5); }
      .form-note { text-align: center; color: #94a3b8; font-size: 0.9rem; margin-top: 1rem; }
      .contact-section { max-width: 1200px; margin: 0 auto; padding: 3rem 2rem; }
      .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
      .contact-card { background: rgba(30, 41, 59, 0.5); backdrop-filter: blur(10px); border: 1px solid rgba(148, 163, 184, 0.1); padding: 2rem; border-radius: 16px; text-align: center; }
      .contact-icon { font-size: 2.5rem; margin-bottom: 1rem; }
      .contact-title { color: #60a5fa; margin-bottom: 0.5rem; font-size: 1.1rem; font-weight: 600; }
      .contact-text { color: #94a3b8; }
      .admin-section { max-width: 1600px; margin: 0 auto; padding: 3rem 2rem; }
      .admin-container { background: rgba(30, 41, 59, 0.5); backdrop-filter: blur(10px); border: 1px solid rgba(148, 163, 184, 0.1); border-radius: 24px; padding: 3rem; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); }
      .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 3rem; }
      .stat-card { background: rgba(15, 23, 42, 0.8); padding: 2rem; border-radius: 16px; text-align: center; border: 1px solid rgba(148, 163, 184, 0.1); }
      .stat-number { font-size: 3.5rem; font-weight: 900; background: linear-gradient(135deg, #60a5fa, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem; }
      .stat-label { font-size: 1rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
      .filter-bar { display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; justify-content: center; }
      .filter-btn { padding: 0.7rem 1.5rem; border: 2px solid rgba(148, 163, 184, 0.2); border-radius: 10px; background: transparent; color: #94a3b8; cursor: pointer; font-size: 0.9rem; font-weight: 600; transition: all 0.3s; }
      .filter-btn.active { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; border-color: transparent; }
      .table-wrap { overflow-x: auto; border-radius: 16px; border: 1px solid rgba(148, 163, 184, 0.1); }
      table { width: 100%; border-collapse: collapse; }
      thead { background: rgba(15, 23, 42, 0.8); }
      th { padding: 1.2rem; text-align: left; font-weight: 700; color: #60a5fa; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid rgba(148, 163, 184, 0.1); }
      td { padding: 1.2rem; border-bottom: 1px solid rgba(148, 163, 184, 0.1); color: #e2e8f0; }
      tbody tr:hover { background: rgba(30, 41, 59, 0.3); }
      .status-badge { padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 700; display: inline-block; border: 1px solid; }
      .action-btns { display: flex; gap: 0.5rem; flex-wrap: wrap; }
      .action-btn { padding: 0.5rem 1rem; border: none; border-radius: 8px; font-size: 0.8rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
      .btn-confirm { background: #2196F3; color: white; }
      .btn-complete { background: #4CAF50; color: white; }
      .btn-cancel { background: #F44336; color: white; }
      .btn-noshow { background: #9E9E9E; color: white; }
      .action-btn:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); }
      .empty-state { text-align: center; padding: 4rem; color: #94a3b8; font-size: 1.2rem; }
      .footer { background: rgba(15, 23, 42, 0.8); border-top: 1px solid rgba(148, 163, 184, 0.1); color: #94a3b8; text-align: center; padding: 2.5rem; }
      @media (max-width: 768px) {
        .form-row { grid-template-columns: 1fr; }
        .hero-title { font-size: 2.5rem; }
        .stats-grid { grid-template-columns: 1fr 1fr; }
      }
      @media (max-width: 500px) {
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(100%, 1fr)); gap: 1.5rem; margin-bottom: 3rem; }
      .stat-card { background: rgba(15, 23, 42, 0.8); padding: 2rem; border-radius: 16px; text-align: center; border: 1px solid rgba(148, 163, 184, 0.1); }
      .stat-number { font-size: 3rem; font-weight: 900; background: linear-gradient(135deg, #60a5fa, #a78bfa); -webkit-background-clip: text; 
      }
      .stat-label{
        font-size:1.2rem;
      }
      .admin-container{
        padding:2rem;
      }
      .form-input, .form-select, .form-textarea { padding: 1rem; background: rgba(15, 23, 42, 0.8); border: 2px solid rgba(148, 163, 184, 0.2); border-radius: 12px; font-size: 1rem; color: #fff; font-family: inherit; transition: all 0.3s; width:100%; display:block;}
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.phone || !formData.service || !formData.date || !formData.time) {
      alert('Please fill in all required fields');
      return;
    }

    const newBooking = {
      id: Date.now(),
      ...formData,
      status: 'Pending',
      createdAt: new Date().toLocaleString()
    };

    setBookings([newBooking, ...bookings]);
    alert(`✅ Appointment booked!\n\nBooking ID: #${newBooking.id}\nStatus: Pending`);
    setFormData({ fullName: '', phone: '', email: '', service: '', date: '', time: '', notes: '' });
  };

  const updateStatus = (id, status) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
    const booking = bookings.find(b => b.id === id);
    if (status === 'Completed') {
      alert(`🎉 Completed!\n\nReview request sent to: ${booking.fullName}\n${booking.phone}`);
    } else if (status === 'Confirmed') {
      alert(`✅ Confirmed!\n\nConfirmation sent to: ${booking.fullName}`);
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const filtered = filterStatus === 'all' ? bookings : bookings.filter(b => b.status === filterStatus);
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    confirmed: bookings.filter(b => b.status === 'Confirmed').length,
    completed: bookings.filter(b => b.status === 'Completed').length,
    today: bookings.filter(b => b.date === new Date().toISOString().split('T')[0]).length
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">🦷</div>
            <div>
              <h1 className="clinic-name">SmileCare Dental</h1>
              <p className="clinic-tagline">Your Smile, Our Priority</p>
            </div>
          </div>
          <button className="toggle-btn" onClick={() => setView(view === 'booking' ? 'admin' : 'booking')}>
            {view === 'booking' ? '👨‍⚕️ Admin Dashboard' : '📅 Book Appointment'}
          </button>
        </div>
      </header>

      {view === 'booking' ? (
        <>
          <section className="hero">
            <h2 className="hero-title">Book Your Appointment</h2>
            <p className="hero-subtitle">Premium Dental Care • Instant Confirmation</p>
          </section>

          <section className="services-section">
            <h3 className="section-title">Our Services</h3>
            <div className="services-grid">
              {services.map((s, i) => (
                <div key={i} className="service-card">
                  <h4 className="service-name">{s.name}</h4>
                  <p className="service-price">{s.price}</p>
                  <p className="service-duration">⏱️ {s.duration}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="form-section">
            <div className="form-container">
              <h3 className="form-title">Schedule Your Visit</h3>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="080XXXXXXXX" className="form-input" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="form-input" />
              </div>

              <div className="form-group">
                <label className="form-label">Select Service *</label>
                <select name="service" value={formData.service} onChange={handleChange} className="form-select">
                  <option value="">Choose a service</option>
                  {services.map((s, i) => <option key={i} value={s.name}>{s.name} - {s.price}</option>)}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Preferred Date *</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} min={getMinDate()} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Time *</label>
                  <select name="time" value={formData.time} onChange={handleChange} className="form-select">
                    <option value="">Select time</option>
                    {timeSlots.map((t, i) => <option key={i} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Additional Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Any special concerns?" className="form-textarea" rows="4" />
              </div>

              <button className="submit-btn" onClick={handleSubmit}>Book Appointment Now</button>
              <p className="form-note">* Confirmation via WhatsApp & SMS</p>
            </div>
          </section>

          <section className="contact-section">
            <div className="contact-grid">
              <div className="contact-card">
                <div className="contact-icon">📍</div>
                <h4 className="contact-title">Location</h4>
                <p className="contact-text">123 Victoria Island, Lagos</p>
              </div>
              <div className="contact-card">
                <div className="contact-icon">📞</div>
                <h4 className="contact-title">Phone</h4>
                <p className="contact-text">+234 801 234 5678</p>
              </div>
              <div className="contact-card">
                <div className="contact-icon">⏰</div>
                <h4 className="contact-title">Hours</h4>
                <p className="contact-text">Mon - Sat: 9AM - 6PM</p>
              </div>
              <div className="contact-card">
                <div className="contact-icon">✉️</div>
                <h4 className="contact-title">Email</h4>
                <p className="contact-text">info@smilecare.ng</p>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="admin-section">
          <div className="admin-container">
            <h3 className="section-title">Dashboard Overview</h3>
            
            <div className="stats-grid">
              <div className="stat-card"><div className="stat-number">{stats.total}</div><div className="stat-label">Total</div></div>
              <div className="stat-card"><div className="stat-number">{stats.pending}</div><div className="stat-label">Pending</div></div>
              <div className="stat-card"><div className="stat-number">{stats.confirmed}</div><div className="stat-label">Confirmed</div></div>
              <div className="stat-card"><div className="stat-number">{stats.completed}</div><div className="stat-label">Completed</div></div>
              <div className="stat-card"><div className="stat-number">{stats.today}</div><div className="stat-label">Today</div></div>
            </div>

            <div className="filter-bar">
              {['all', 'Pending', 'Confirmed', 'Completed', 'Cancelled', 'No-Show'].map(s => (
                <button key={s} className={`filter-btn ${filterStatus === s ? 'active' : ''}`} onClick={() => setFilterStatus(s)}>
                  {s === 'all' ? 'All Bookings' : `${s === 'Pending' ? '⏳' : s === 'Confirmed' ? '✅' : s === 'Completed' ? '✔️' : s === 'Cancelled' ? '❌' : '🚫'} ${s}`}
                </button>
              ))}
            </div>

            <div className="table-wrap">
              {filtered.length === 0 ? (
                <div className="empty-state">No appointments found</div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>ID</th><th>Patient</th><th>Phone</th><th>Service</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(b => (
                      <tr key={b.id}>
                        <td>#{b.id}</td>
                        <td>{b.fullName}</td>
                        <td>{b.phone}</td>
                        <td>{b.service}</td>
                        <td>{b.date}</td>
                        <td>{b.time}</td>
                        <td>
                          <span className="status-badge" style={{ background: statusStyles[b.status].bg, color: statusStyles[b.status].color, borderColor: statusStyles[b.status].color }}>
                            {b.status === 'Pending' ? '⏳' : b.status === 'Confirmed' ? '✅' : b.status === 'Completed' ? '✔️' : b.status === 'Cancelled' ? '❌' : '🚫'} {b.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-btns">
                            {b.status === 'Pending' && <button className="action-btn btn-confirm" onClick={() => updateStatus(b.id, 'Confirmed')}>✅ Confirm</button>}
                            {(b.status === 'Confirmed' || b.status === 'Pending') && <button className="action-btn btn-complete" onClick={() => updateStatus(b.id, 'Completed')}>✔️ Complete</button>}
                            {b.status === 'Confirmed' && <button className="action-btn btn-noshow" onClick={() => updateStatus(b.id, 'No-Show')}>🚫 No-Show</button>}
                            {(b.status === 'Pending' || b.status === 'Confirmed') && <button className="action-btn btn-cancel" onClick={() => updateStatus(b.id, 'Cancelled')}>❌ Cancel</button>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </section>
      )}

      <footer className="footer">
        <p>© 2024 SmileCare Dental. Built with ❤️</p>
      </footer>
    </div>
  );
};

export default App;