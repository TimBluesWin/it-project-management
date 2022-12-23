import React, { useEffect, useState } from 'react'

import {
    CPUInput, MemoryInput
  } from 'src/components/ComparisonFormElements'

export function FilterForm() {
    return (
        <div class="row">
            <div className="col-md-12">
                <form>
                    <CPUInput/>
                    <MemoryInput/>
                </form>
            </div>
        </div>
    )


}