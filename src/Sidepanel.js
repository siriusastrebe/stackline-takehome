import "./Sidepanel.css";

function Sidepanel(props) {
  const product = props.product;
  return (<div className="sidepanel">
    <div>
      <img src={product.image} className="product-image"></img>
    </div>
    <div className="product-title">
      {product.title}
    </div>
    <div className="product-subtitle">
      {product.subtitle}
    </div>
    <div className="product-tags">
      {product.tags.map(tag => <div key={`product-tag-${tag}`} className="tag">{tag}</div>)}
    </div>
  </div>)
}
export default Sidepanel;