import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { QueryParamsHandling } from '@angular/router';

export interface ExpansionPanelTreeHeader {
  description: string;
  title: string;
}

export interface ExpansionPanelTreeRouterLink {
  queryParams: { [k: string]: any; }
  fragment: string;
  queryParamsHandling: QueryParamsHandling;
  preserveFragment: boolean;
  skipLocationChange: boolean;
  replaceUrl: boolean;
  state?: { [k: string]: any; };
  routerLink: string | any[];
  text: string;
}

export interface ExpansionPanelTree {
  data: {
    header?: ExpansionPanelTreeHeader;
    routerLink?: ExpansionPanelTreeRouterLink;
  },
  childList: ExpansionPanelTree[];
}

@Component({
  selector: 'gdgtoulouse-expansion-panel-tree',
  templateUrl: './expansion-panel-tree.component.html',
  styleUrls: ['./expansion-panel-tree.component.scss']
})

export class ExpansionPanelTreeComponent implements OnInit {
  @Input() inputTree: ExpansionPanelTree[];

  constructor() { }

  ngOnInit(): void {
  }

  hasChild = (node: ExpansionPanelTree) => !!node.childList && node.childList.length > 0;
}
