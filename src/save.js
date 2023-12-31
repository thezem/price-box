import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export default function save({ attributes, clientId }) {
  const { price, planName, benefits, discount, link, addedStyles, featured, featuredText, description, theme } = attributes;
  const { dottedList: dotted, alignList, alignPrice, planPlacement, borderRadius, boxShadow } = addedStyles;

  return (
    <div
      {...useBlockProps.save({
        className: `border-${borderRadius} box-shadow-${boxShadow} align-${alignPrice}}`,
      })}
    >
      <div className={`price-box-container ${featured ? 'featured-block' : theme}`}>
        {featured && (
          <div className="featured-tag">
            <RichText.Content tagName="p" value={featuredText} />
          </div>
        )}

        {planPlacement == 'top' ? (
          <>
            <RichText.Content className="price-box-plan-name" tagName={addedStyles?.planNameTag || 'h1'} value={planName} />
            <div className="price-tag-wrapper">
              {discount && <RichText.Content className="price-tag-initial" tagName="p" value={`$${discount}`} />}
              <RichText.Content className="price-tag" tagName="h1" value={`$${price}`} />
            </div>
          </>
        ) : (
          <>
            <div className="price-tag-wrapper">
              {discount && <RichText.Content className="price-tag-initial" tagName="p" value={`$${discount}`} />}
              <RichText.Content className="price-tag" tagName="h1" value={`$${price}`} />
            </div>
            <RichText.Content className="price-box-plan-name" tagName={addedStyles?.planNameTag || 'h1'} value={planName} />
          </>
        )}

        <RichText.Content className="price-description" tagName="p" value={description} />

        {benefits && benefits.length > 0 && (
          <ul className="price-box-ul">
            {benefits.map((benefit, i) => (
              <RichText.Content tagName="li" value={benefit} />
            ))}
          </ul>
        )}

        <a href={link}>
          <button className="cta-button">Buy Now</button>
        </a>
      </div>
    </div>
  );
}
