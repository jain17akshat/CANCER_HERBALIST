/**
 * Skeleton.jsx — Site-wide Skeleton Loader System
 * Provides shimmer building blocks + page-specific skeleton layouts
 * for every route in the Cancer Herbalist website.
 */
import React from 'react';

/* ─── Base shimmer styles ───────────────────────────────────────── */
const shimmerStyle = `
  @keyframes skeletonShimmer {
    0%   { background-position: -700px 0; }
    100% { background-position: 700px 0; }
  }
  .sk-bone {
    background: linear-gradient(
      90deg,
      #e2e8f0 25%,
      #f1f5f9 50%,
      #e2e8f0 75%
    );
    background-size: 700px 100%;
    animation: skeletonShimmer 1.6s ease-in-out infinite;
    border-radius: 8px;
  }
`;

/* ─── Primitive Bone ────────────────────────────────────────────── */
export function Bone({ w = '100%', h = '16px', r = '8px', style = {} }) {
  return (
    <div
      className="sk-bone"
      style={{ width: w, height: h, borderRadius: r, flexShrink: 0, ...style }}
    />
  );
}

/* ─── Circle Bone ────────────────────────────────────────────────── */
export function Circle({ size = '48px' }) {
  return <Bone w={size} h={size} r="50%" />;
}

/* ─── Card Skeleton ──────────────────────────────────────────────── */
export function CardSkeleton({ hasImage = true, lines = 3 }) {
  return (
    <div style={{ background: '#fff', borderRadius: '20px', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
      {hasImage && <Bone h="180px" r="12px" style={{ marginBottom: '18px' }} />}
      <Bone w="60%" h="20px" style={{ marginBottom: '12px' }} />
      {Array.from({ length: lines }).map((_, i) => (
        <Bone key={i} w={i === lines - 1 ? '75%' : '100%'} h="13px" style={{ marginBottom: '8px' }} />
      ))}
      <Bone w="120px" h="36px" r="50px" style={{ marginTop: '18px' }} />
    </div>
  );
}

/* ─── Hero Skeleton ──────────────────────────────────────────────── */
export function HeroSkeleton() {
  return (
    <div style={{ background: '#e2e8f0', padding: 'clamp(80px,14vw,140px) 20px clamp(60px,8vw,90px)', position: 'relative', overflow: 'hidden' }}>
      <div className="sk-bone" style={{ position: 'absolute', inset: 0, borderRadius: 0, opacity: 0.6 }} />
      <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <Bone w="140px" h="30px" r="50px" />
        <Bone w="80%" h="52px" r="12px" />
        <Bone w="65%" h="52px" r="12px" />
        <Bone w="70%" h="18px" />
        <Bone w="55%" h="18px" />
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <Bone w="160px" h="48px" r="50px" />
          <Bone w="140px" h="48px" r="50px" />
        </div>
      </div>
    </div>
  );
}

/* ─── Section Header Skeleton ────────────────────────────────────── */
export function SectionHeaderSkeleton() {
  return (
    <div style={{ textAlign: 'center', marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <Bone w="120px" h="26px" r="50px" />
      <Bone w="55%" h="38px" r="10px" />
      <Bone w="45%" h="18px" />
    </div>
  );
}

/* ─── Card Grid Skeleton ─────────────────────────────────────────── */
export function CardGridSkeleton({ count = 6, hasImage = true, cols = 3 }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(min(${Math.floor(1100 / cols)}px, 100%), 1fr))`,
      gap: '24px',
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} hasImage={hasImage} lines={3} />
      ))}
    </div>
  );
}

/* ─── List Skeleton ──────────────────────────────────────────────── */
export function ListSkeleton({ count = 5 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'center', background: '#fff', padding: '18px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
          <Circle size="44px" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Bone w="50%" h="16px" />
            <Bone w="80%" h="13px" />
          </div>
          <Bone w="70px" h="32px" r="50px" />
        </div>
      ))}
    </div>
  );
}

/* ─── Split Section Skeleton (image + text list) ─────────────────── */
export function SplitSectionSkeleton({ imageRight = false }) {
  const imageBlock = <Bone w="100%" h="420px" r="20px" />;
  const listBlock = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <Bone w="50%" h="32px" r="8px" />
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '14px', borderRadius: '12px', background: '#fff', border: '1px solid #e2e8f0' }}>
          <Circle size="36px" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '7px' }}>
            <Bone w="40%" h="14px" />
            <Bone w="85%" h="12px" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }} className="sk-split">
      {imageRight ? <>{listBlock}{imageBlock}</> : <>{imageBlock}{listBlock}</>}
      <style>{`.sk-split { @media (max-width: 768px) { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

/* ─── Detail Hero Skeleton (service/blog/product detail) ─────────── */
export function DetailHeroSkeleton() {
  return (
    <div style={{ position: 'relative', height: '340px', background: '#1a2a2a', display: 'flex', alignItems: 'flex-end', padding: '40px', overflow: 'hidden' }}>
      <div className="sk-bone" style={{ position: 'absolute', inset: 0, borderRadius: 0, opacity: 0.5 }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '700px' }}>
        <Bone w="80px" h="22px" r="50px" style={{ background: 'rgba(255,255,255,0.3)' }} />
        <Bone w="70%" h="42px" r="10px" style={{ background: 'rgba(255,255,255,0.3)' }} />
        <Bone w="50%" h="20px" style={{ background: 'rgba(255,255,255,0.2)' }} />
      </div>
    </div>
  );
}

/* ─── Blog / Content Area Skeleton ───────────────────────────────── */
export function ContentBlockSkeleton({ paragraphs = 4 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {Array.from({ length: paragraphs }).map((_, i) => (
        <React.Fragment key={i}>
          <Bone w="100%" h="14px" />
          <Bone w="100%" h="14px" />
          <Bone w="80%" h="14px" style={{ marginBottom: '12px' }} />
        </React.Fragment>
      ))}
    </div>
  );
}

/* ─── Stats Bar Skeleton ─────────────────────────────────────────── */
export function StatsSkeleton() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px,1fr))', gap: '24px', padding: '32px 20px', background: '#fff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Bone w="70px" h="40px" r="8px" />
          <Bone w="100px" h="14px" />
        </div>
      ))}
    </div>
  );
}

/* ─── Product Card Skeleton ──────────────────────────────────────── */
export function ProductCardSkeleton({ count = 6 }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px,100%), 1fr))', gap: '24px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
          <Bone h="220px" r="0" />
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Bone w="30%" h="20px" r="50px" />
            <Bone w="75%" h="20px" />
            <Bone w="100%" h="13px" />
            <Bone w="90%" h="13px" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
              <Bone w="80px" h="28px" />
              <Bone w="100px" h="36px" r="50px" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Form Skeleton ──────────────────────────────────────────────── */
export function FormSkeleton({ fields = 5 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Bone w="120px" h="13px" />
          <Bone w="100%" h="46px" r="10px" />
        </div>
      ))}
      <Bone w="100%" h="50px" r="12px" style={{ marginTop: '8px' }} />
    </div>
  );
}

/* ─── Table Skeleton (Orders) ────────────────────────────────────── */
export function TableSkeleton({ rows = 6 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {/* Header row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '16px', padding: '14px 20px', background: '#f8fafc', borderRadius: '12px 12px 0 0', border: '1px solid #e2e8f0' }}>
        {['Order ID', 'Customer', 'Status', 'Amount'].map(h => (
          <Bone key={h} w="80%" h="13px" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '16px', padding: '16px 20px', borderLeft: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
          <Bone w="75%" h="14px" />
          <Bone w="65%" h="14px" />
          <Bone w="80px" h="22px" r="50px" />
          <Bone w="60%" h="14px" />
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PAGE-LEVEL SKELETON LAYOUTS
   Each matches the rough layout of the corresponding route.
───────────────────────────────────────────────────────────────── */

const Section = ({ children, bg = '#fff', py = '60px' }) => (
  <section style={{ background: bg, padding: `${py} 20px` }}>
    <div style={{ maxWidth: '1180px', margin: '0 auto' }}>{children}</div>
  </section>
);

/* Home */
export function HomePageSkeleton() {
  return (
    <>
      <HeroSkeleton />
      <StatsSkeleton />
      <Section bg="#f8fafc"><SectionHeaderSkeleton /><CardGridSkeleton count={4} hasImage={false} cols={4} /></Section>
      <Section><SectionHeaderSkeleton /><CardGridSkeleton count={6} hasImage={false} cols={3} /></Section>
      <Section bg="#f8fafc"><SectionHeaderSkeleton /><CardGridSkeleton count={4} hasImage={false} cols={4} /></Section>
      <Section><ListSkeleton count={4} /></Section>
    </>
  );
}

/* Care Programs */
export function CareProgramsSkeleton() {
  return (
    <>
      <HeroSkeleton />
      <Section><SectionHeaderSkeleton /><CardGridSkeleton count={6} hasImage={false} cols={3} /></Section>
      <Section bg="#f8fafc"><SectionHeaderSkeleton /><ListSkeleton count={5} /></Section>
    </>
  );
}

/* Service Detail */
export function ServiceDetailSkeleton() {
  return (
    <>
      <DetailHeroSkeleton />
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Bone w="40%" h="28px" />
            <ContentBlockSkeleton paragraphs={3} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Bone w="40%" h="28px" />
            <ListSkeleton count={4} />
          </div>
        </div>
      </Section>
      <Section bg="#f8fafc"><SectionHeaderSkeleton /><CardGridSkeleton count={6} hasImage={false} cols={3} /></Section>
    </>
  );
}

/* Blog / Patient Education list */
export function BlogListSkeleton() {
  return (
    <>
      <HeroSkeleton />
      <Section><SectionHeaderSkeleton /><CardGridSkeleton count={6} hasImage={true} cols={3} /></Section>
    </>
  );
}

/* Blog Detail / Story Detail */
export function BlogDetailSkeleton() {
  return (
    <>
      <DetailHeroSkeleton />
      <Section>
        <div style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Bone w="100%" h="400px" r="16px" />
          <ContentBlockSkeleton paragraphs={5} />
        </div>
      </Section>
    </>
  );
}

/* Store (Product Grid) */
export function StoreSkeleton() {
  return (
    <>
      <Section py="80px"><SectionHeaderSkeleton /><ProductCardSkeleton count={6} /></Section>
    </>
  );
}

/* Product Detail */
export function ProductDetailSkeleton() {
  return (
    <Section py="100px">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
        <Bone h="480px" r="20px" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Bone w="30%" h="22px" r="50px" />
          <Bone w="80%" h="36px" />
          <Bone w="100%" h="16px" />
          <Bone w="90%" h="16px" />
          <Bone w="120px" h="34px" style={{ marginTop: '8px' }} />
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <Bone w="160px" h="50px" r="50px" />
            <Bone w="50px" h="50px" r="50%" />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* About */
export function AboutSkeleton() {
  return (
    <>
      <HeroSkeleton />
      <Section><SplitSectionSkeleton imageRight={false} /></Section>
      <Section bg="#f8fafc"><SectionHeaderSkeleton /><CardGridSkeleton count={4} hasImage={false} cols={4} /></Section>
    </>
  );
}

/* Doctors */
export function DoctorsSkeleton() {
  return (
    <>
      <HeroSkeleton />
      <Section><SectionHeaderSkeleton /><CardGridSkeleton count={4} hasImage={true} cols={4} /></Section>
    </>
  );
}

/* Testimonials */
export function TestimonialsSkeleton() {
  return (
    <>
      <HeroSkeleton />
      <Section><SectionHeaderSkeleton /><CardGridSkeleton count={6} hasImage={false} cols={3} /></Section>
    </>
  );
}

/* Contact */
export function ContactSkeleton() {
  return (
    <>
      <HeroSkeleton />
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
          <FormSkeleton fields={6} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Bone h="300px" r="16px" />
            <ListSkeleton count={3} />
          </div>
        </div>
      </Section>
    </>
  );
}

/* Checkout */
export function CheckoutSkeleton() {
  return (
    <Section py="100px">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px' }}>
        <FormSkeleton fields={7} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Bone h="240px" r="16px" />
          <Bone h="60px" r="12px" />
          <Bone h="50px" r="50px" />
        </div>
      </div>
    </Section>
  );
}

/* Orders / Track Order / My Orders */
export function OrdersSkeleton() {
  return (
    <Section py="100px">
      <SectionHeaderSkeleton />
      <TableSkeleton rows={6} />
    </Section>
  );
}

/* Generic / Treatment Methods / Patient Education / Policies */
export function GenericPageSkeleton() {
  return (
    <>
      <HeroSkeleton />
      <Section><SectionHeaderSkeleton /><ContentBlockSkeleton paragraphs={5} /></Section>
      <Section bg="#f8fafc"><CardGridSkeleton count={3} hasImage={false} cols={3} /></Section>
    </>
  );
}

/* Styles injection */
export function SkeletonStyles() {
  return <style>{shimmerStyle}</style>;
}
