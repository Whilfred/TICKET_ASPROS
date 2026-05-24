import { IcTicket } from '../common/Icons';

export const Logo = () => (
  <div className="logo-mark">
    <div className="logo-icon">
      <IcTicket size={20} />
    </div>
    <span className="logo-text">
      TICKET<span className="logo-bold">ASPROS</span>
    </span>
  </div>
);