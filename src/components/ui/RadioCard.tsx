import { RadioGroup, RadioGroupItem } from './radio-group'
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from './field'
import type { AddressType } from '../AuthProvider'
import { type Dispatch, type SetStateAction } from 'react'

type propType = {
    addresses : AddressType[],
    selectAddress : string
    setAddress : Dispatch<SetStateAction<string>>
}

const RadioCard = ({addresses, setAddress, selectAddress} : propType) => {

  return (
    <div> 
    <RadioGroup value={selectAddress} className="flex flex-col w-xs m-2" onValueChange={(value) => setAddress(value)}>
      {
        addresses.map((address) =>{
        return (
          <FieldLabel key={address.id} htmlFor={address.id}>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>{address.pincode}</FieldTitle>
                <FieldDescription>
                  {address.address}
                </FieldDescription>
                <FieldDescription>
                  {address.country}
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value={address.id} id={address.id} />
            </Field>
          </FieldLabel>
        );
        })
      }
    </RadioGroup>
    </div>
  )
}

export default RadioCard