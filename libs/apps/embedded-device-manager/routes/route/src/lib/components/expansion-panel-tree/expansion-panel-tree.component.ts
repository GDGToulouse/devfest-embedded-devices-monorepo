import { Component, OnInit } from '@angular/core';
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

  TREE_DATA: ExpansionPanelTree[] = [
    {
      data: {
        header: {
          description: 'description1',
          title: 'test1'
        },
        routerLink: null
      },
      childList: []
    },
    {
      data: {
        header: {
          description: 'description2',
          title: 'test2'
        },
        routerLink: null
      },
      childList: [
        {
          data: {
            header: {
              description: 'description2.1',
              title: 'test2.1'
            },
            routerLink: null
          },
          childList: []
        }, {
          data: {
            header: {
              description: 'description2.2',
              title: 'test2.2'
            },
            routerLink: null
          },
          childList: [
            {
              data: {
                header: {
                  description: 'description2.2.3',
                  title: 'test2.2.3'
                },
                routerLink: null
              },
              childList: []
            }
          ]
        },
      ]
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  NestedTreeControl
  hasChild = (node: ExpansionPanelTree) => !!node.childList && node.childList.length > 0;

}
