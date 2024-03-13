import moment from 'moment';
import PropTypes from 'prop-types';
import './../css/produitCard.css';

const Produit = ({ produitData }) => {
    if (produitData.id === 1) {
        console.log(produitData.vendeur.image);
        console.log(produitData);
    }
    return (
        <div className="product-card">
            <img loading="lazy" src={`http://ofpptecomtest.infinityfreeapp.com/${produitData.image}`} alt="Product Name" />
            <div className='product-content'>
                <h2 className="product-title">{produitData.nom}</h2>
                <p className="product-description">{produitData.description}</p>
                <span className="product-price">{produitData.prix} MAD</span>
            </div>
            <div className="product-vendeur-container">
                <div className='product-vendeur'>
                    <img src={`http://ofpptecomtest.infinityfreeapp.com/${produitData.vendeur.image}`} alt="Vendeur Name" />
                    <p className='product-vendeur-infos'>
                        <b>{produitData.vendeur.nom}</b>
                        <br />
                        {produitData.vendeur.numero_de_telephone}
                    </p>
                </div>
            </div>
        </div>
    );
};

Produit.propTypes = {
    produitData: PropTypes.object.isRequired,
};

export default Produit;