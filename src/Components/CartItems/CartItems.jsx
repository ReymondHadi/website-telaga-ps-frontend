import React, { useContext, useState } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const {getTotalCartAmount, all_product, cartItems, removeFromCart, clearCart} = useContext(ShopContext);
    const [showPayment, setShowPayment] = useState(false);
    const [selectedBank, setSelectedBank] = useState('');
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    
    // Bank account details
    const bankAccounts = {
        BCA: {
            accountNumber: '1660339678',
            accountName: 'Telaga PS'
        },
        BRI: {
            accountNumber: '0987654321',
            accountName: 'Telaga PS'
        },
        Mandiri: {
            accountNumber: '5647382910',
            accountName: 'Telaga PS'
        }
    };

    const handleProceedToCheckout = () => {
        setShowPayment(true);
    };

    const handlePaymentConfirmation = async () => {
    try {
        // Simpan transaksi ke backend (opsional)
        const items = all_product
            .filter(e => cartItems[e.id] > 0)
            .map(e => ({
                productId: e.id,
                name: e.name,
                quantity: cartItems[e.id],
                price: e.new_price
            }));
        
        const transactionData = {
            items,
            totalAmount: getTotalCartAmount(),
            bank: selectedBank
        };
        
        // Kirim data transaksi ke backend
        const response = await fetch('http://localhost:4000/create-transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify(transactionData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Clear cart and show success message
            clearCart();
            setPaymentConfirmed(true);
            
            // Reset after 5 seconds
            setTimeout(() => {
                setShowPayment(false);
                setPaymentConfirmed(false);
            }, 5000);
        } else {
            alert('Gagal menyimpan transaksi');
        }
    } catch (error) {
        console.error("Error confirming payment:", error);
        alert('Terjadi kesalahan saat mengkonfirmasi pembayaran');
    }
};

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e)=>{
                if(cartItems[e.id]>0)
                {
                    return <div key={e.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>Rp {e.new_price.toLocaleString('id-ID')}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>Rp {(e.new_price*cartItems[e.id]).toLocaleString('id-ID')}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                            </div>
                            <hr />
                        </div>
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>Rp {getTotalCartAmount().toLocaleString('id-ID')}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>Rp {getTotalCartAmount().toLocaleString('id-ID')}</h3>
                        </div>
                    </div>
                    <div className="cartitems-buttons">
                        {!showPayment ? (
                            <>
                                <button onClick={handleProceedToCheckout}>
                                    PROCEED TO CHECKOUT
                                </button>
                            </>
                        ) : null}
                    </div>
                    
                    {/* Payment Gateway Section */}
                    {showPayment && (
                        <div className="payment-gateway">
                            {paymentConfirmed ? (
                                <div className="payment-success">
                                    <h3>Pembayaran Berhasil!</h3>
                                    <p>Terima kasih telah berbelanja. Pesanan Anda sedang diproses.</p>
                                </div>
                            ) : (
                                <>
                                    <h3>Pilih Metode Pembayaran</h3>
                                    <div className="bank-options">
                                        <div 
                                            className={`bank-option ${selectedBank === 'BCA' ? 'selected' : ''}`}
                                            onClick={() => setSelectedBank('BCA')}>
                                            <div className="bank-logo bca"></div>
                                            <span>BCA</span>
                                        </div>
                                        <div 
                                            className={`bank-option ${selectedBank === 'BRI' ? 'selected' : ''}`}
                                            onClick={() => setSelectedBank('BRI')}>
                                            <div className="bank-logo bri"></div>
                                            <span>BRI</span>
                                        </div>
                                        <div 
                                            className={`bank-option ${selectedBank === 'Mandiri' ? 'selected' : ''}`}
                                            onClick={() => setSelectedBank('Mandiri')}>
                                            <div className="bank-logo mandiri"></div>
                                            <span>Mandiri</span>
                                        </div>
                                    </div>
                                    
                                    {selectedBank && (
                                        <div className="bank-details">
                                            <h4>Rekening {selectedBank}</h4>
                                            <p>Nomor Rekening: <strong>{bankAccounts[selectedBank].accountNumber}</strong></p>
                                            <p>Atas Nama: <strong>{bankAccounts[selectedBank].accountName}</strong></p>
                                            <p>Total Pembayaran: <strong>Rp {getTotalCartAmount().toLocaleString('id-ID')}</strong></p>
                                            
                                            <div className="payment-instructions">
                                                <h5>Instruksi Pembayaran:</h5>
                                                <ol>
                                                    <li>Transfer tepat sejumlah total pembayaran ke rekening di atas</li>
                                                    <li>Simpan bukti transfer</li>
                                                    <li>Klik tombol konfirmasi di bawah setelah transfer</li>
                                                </ol>
                                            </div>
                                            
                                            <button 
                                                onClick={handlePaymentConfirmation}
                                                className="confirm-payment-button"
                                            >
                                                Saya Sudah Transfer
                                            </button>
                                            
                                            <button 
                                                onClick={() => setShowPayment(false)}
                                                className="cancel-payment-button"
                                            >
                                                Batalkan Pembayaran
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promocode, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='Promo Code' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems