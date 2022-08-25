import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Icon } from '@visurel/iconify-angular';
import icAccessTime from '@iconify/icons-ic/twotone-access-time';
import icCancel from '@iconify/icons-ic/twotone-cancel';
import icCheck from '@iconify/icons-ic/twotone-check-circle';
import icSend from '@iconify/icons-ic/twotone-send';
import icViewHeadline from '@iconify/icons-ic/twotone-view-headline';
import icWhereToVote from '@iconify/icons-ic/twotone-where-to-vote';
import { Order } from 'src/app/models/order.model';

export interface OrdersTableMenu {
  type: 'link',
  id?: 'all' | 'Pendiente de pago' | 'Pagado' | 'Cancelado' | 'En camino' | 'Entregado',
  icon?: Icon,
  label: string,
  classes?: {
    icon?: string
  }
}

@Component({
  selector: 'spc-orders-table-menu',
  templateUrl: './orders-table-menu.component.html'
})
export class OrdersTableMenuComponent implements OnInit {

  @Input() ordersData: Order[];

  data: any[] = [];

  @Input() items: OrdersTableMenu[] = [
    {
      type: 'link',
      id: 'all',
      icon: icViewHeadline,
      label: 'Todos los pedidos'
    },
    {
      type: 'link',
      id: 'Pendiente de pago',
      icon: icAccessTime,
      label: 'Pendientes de pago',
      classes: {
        icon: 'text-amber'
      }
    },
    {
      type: 'link',
      id: 'Pagado',
      icon: icCheck,
      label: 'Pagados',
      classes: {
        icon: 'text-green'
      }
    },
    {
      type: 'link',
      id: 'Cancelado',
      icon: icCancel,
      label: 'Cancelados',
      classes: {
        icon: 'text-red'
      }
    },
    {
      type: 'link',
      id: 'En camino',
      icon: icSend,
      label: 'En camino',
      classes: {
        icon: 'text-gray'
      }
    },
    {
      type: 'link',
      id: 'Entregado',
      icon: icWhereToVote,
      label: 'Entregados',
      classes: {
        icon: 'text-cyan'
      }
    },
  ];

  @Output() filterChange = new EventEmitter<Order[]>();

  activeCategory: OrdersTableMenu['id'] = 'all';

  constructor() {}
  
  ngOnInit(): void {
    this.data = this.ordersData
  }

  setFilter(category: OrdersTableMenu['id']) {
    this.activeCategory = category;  
    if (category === 'all') {
      return this.filterChange.emit(this.data);
    } 
    
    if (category === 'Pendiente de pago') {
      return this.filterChange.emit(this.data.filter(c => c.status.text === 'Pendiente de pago'));
    } 
    
    if (category === 'Cancelado') {
      return this.filterChange.emit(this.data.filter(c => c.status.text === 'Cancelado'));
    } 
    
    if (category === 'Pagado') {
      return this.filterChange.emit(this.data.filter(c => c.status.text === 'Pagado'));
    }
    
    if (category === 'En camino') {
      return this.filterChange.emit(this.data.filter(c => c.status.text === 'En camino'));
    }
    
    if (category === 'Entregado') {
      return this.filterChange.emit(this.data.filter(c => c.status.text === 'Entregado'));
    }
    
  }

  isActive(category: OrdersTableMenu['id']) {
    return this.activeCategory === category;
  }

}
