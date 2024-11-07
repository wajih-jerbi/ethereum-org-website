"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Wallet } from "@/lib/types"

import WalletInfo from "@/components/FindWalletProductTable/WalletInfo"
import { Button } from "@/components/ui/buttons/Button"

import { trackCustomEvent } from "@/lib/utils/matomo"

export const useWalletColumns: ColumnDef<Wallet>[] = [
  {
    id: "walletInfo",
    header: ({ table }) => (
      <div className="flex w-full flex-row items-center justify-between border-none px-4 py-2">
        <Button
          variant="ghost"
          className="block p-0 lg:hidden"
          onClick={() => {
            trackCustomEvent({
              eventCategory: "MobileFilterToggle",
              eventAction: "Tap MobileFilterToggle - sticky",
              eventName: "show mobile filters true",
            })
            table.options.meta.setMobileFiltersOpen(true)
          }}
        >
          <p className="text-md">
            {`Filters (${table.options.meta.activeFiltersCount})`}
          </p>
        </Button>
        {table.options.meta.dataLength === table.options.meta.allDataLength ? (
          <p>
            Showing all wallets <b>({table.options.meta.dataLength})</b>
          </p>
        ) : (
          <p>
            Showing{" "}
            <b>
              {table.options.meta.dataLength}/{table.options.meta.allDataLength}
            </b>{" "}
            wallets
          </p>
        )}
      </div>
    ),
    cell: ({ row }) => {
      return (
        <WalletInfo wallet={row.original} isExpanded={row.getIsExpanded()} />
      )
    },
  },
]
