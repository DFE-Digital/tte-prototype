**To update GIAS data**
- Go to download on get information about schools : https://www.get-information-schools.service.gov.uk/Downloads
- Select 'Establishment fields' and download
- In prototype go to app > assets > data > and place new csv here
- Open file and remove all rows with 'EstablishmentStatus (name)' as 'Closed'
- Use Copilot to convert the csv to a JSON file, using the prompt: 
_Convert the provided CSV file into a JSON file with all values in double quotes.
Use latin1 encoding to avoid Unicode errors.
Output JSON as an array of objects.
Then remove all of the following fields from the JSON (ignore missing fields):
LA (code), LA (name), EstablishmentNumber, TypeOfEstablishment (code),
EstablishmentTypeGroup (code), EstablishmentStatus (code),
ReasonEstablishmentOpened (code), ReasonEstablishmentOpened (name), OpenDate,
ReasonEstablishmentClosed (code), ReasonEstablishmentClosed (name), CloseDate,
PhaseOfEducation (code), PhaseOfEducation (name), StatutoryLowAge,
StatutoryHighAge, Boarders (code), Boarders (name), NurseryProvision (name),
OfficialSixthForm (code), OfficialSixthForm (name), Gender (code),
Gender (name), ReligiousCharacter (code), ReligiousCharacter (name),
ReligiousEthos (name), Diocese (code), Diocese (name),
AdmissionsPolicy (code), AdmissionsPolicy (name), CensusDate, NumberOfBoys,
NumberOfGirls, TrustSchoolFlag (code), TrustSchoolFlag (name),
Trusts (code), Trusts (name), SchoolSponsorFlag (name),
SchoolSponsors (name), FederationFlag (name), Federations (code),
Federations (name), FEHEIdentifier, SchoolWebsite, TelephoneNum,
HeadTitle (name), HeadFirstName, HeadLastName, HeadPreferredJobTitle,
BSOInspectorateName (name), InspectorateReport, DateOfLastInspectionVisit,
NextInspectionVisit, TeenMoth (name), TeenMothPlaces, CCF (name),
EBD (name), PlacesPRU, FTProv (name), EdByOther (name),
Section41Approved (name), SEN1 (name), SEN2 (name), SEN3 (name),
SEN4 (name), SEN5 (name), SEN6 (name), SEN7 (name), SEN8 (name),
SEN9 (name), SEN10 (name), SEN11 (name), SEN12 (name), SEN13 (name),
TypeOfResourcedProvision (name), ResourcedProvisionOnRoll,
ResourcedProvisionCapacity, SenUnitOnRoll, SenUnitCapacity, GOR (code),
GOR (name), DistrictAdministrative (code), DistrictAdministrative (name),
AdministrativeWard (code), AdministrativeWard (name),
ParliamentaryConstituency (code), ParliamentaryConstituency (name),
UrbanRural (code), UrbanRural (name), GSSLACode (name), Easting, Northing,
MSOA (name), LSOA (name), InspectorateName (name), SENStat,
SENNoStat, BoardingEstablishment (name), PropsName, PreviousLA (code),
PreviousLA (name), PreviousEstablishmentNumber, Country (name), UPRN,
SiteName, QABName (code), QABName (name), EstablishmentAccredited (code),
EstablishmentAccredited (name), QABReport, CHNumber, MSOA (code),
LSOA (code), FSM, AccreditationExpiryDate
After removing all listed fields, save the final output as a compact JSON file and report its file size._
- Download the JSON file and place in the same folder as the csv
- Name them both 'giasdataYYYYMMDD'
- Delete old files
- Edit the 'which-school.html' file to look at the new JSON file
- Test it's working
